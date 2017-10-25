import dotenv from 'dotenv'
import os from 'os'
import path from 'path'
import Koa from 'koa'
import fs from 'fs-promise'
import koaBody from 'koa-body'
import uuid from 'uuid'
import cloudinary from 'cloudinary'
import sql from './connector/sql'
import jwt from 'jsonwebtoken'
import queue from 'queue'

dotenv.config()

const {
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
} = process.env

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
})

const DEFAULT_PORT = 8083
const PORT = process.env.PORT || DEFAULT_PORT

const server = new Koa()

server.use(koaBody({ multipart: true }))

const fileSystemJobQueue = queue({ autostart: true })
const cloudinaryJobQueue = queue({ autostart: true })
const databaseJobQueue = queue({ autostart: true })

const processUpload = async(userId, files) => {
    console.log(`processUpload => ${JSON.stringify(userId)}`)
    // create a temporary folder to store files
    const tmpdir = path.join(os.tmpdir(), uuid())

    // make the temporary directory
    await fs.mkdir(tmpdir)
    const filePaths = []

    for (let key in files) {
        const file = files[key]
        const filePath = path.join(tmpdir, file.name)
        const reader = fs.createReadStream(file.path)
        const writer = fs.createWriteStream(filePath)

        reader.pipe(writer)
        filePaths.push(filePath)
        /* eslint-disable no-loop-func */

        return new Promise((resolve) => {
            reader.on('end', () => {
                cloudinaryJobQueue.push(() => uploadToCloudinary(filePath, userId))
                resolve()
            })
        })
    }
}

const uploadToCloudinary = (filePath, userId) => {
    console.log(`uploadToCloudinary => ${filePath} - ${userId}`)

    return cloudinaryJobQueue.push(() =>
        cloudinary.v2.uploader.upload(filePath,
            (error, result) => {
                if (error) console.error(`error => ${error}`)
                console.log(`result => ${JSON.stringify(result.url)}`)
                fileSystemJobQueue.push(() => deleteFile(filePath, result.url, userId))
            })
    )
}

const deleteFile = (filePath, url, userId) => {
    console.log(`deleteFile => ${filePath} - ${url} - ${userId}`)

    return fs.unlink(filePath, error => {
        if (error) {
            console.error(`error => ${error}`)
        } else {
            databaseJobQueue.push(() => setAvatarInTheDb(url, userId))
        }
    })
}

const setAvatarInTheDb = (url, userId) => {
    console.log(`setAvatarInTheDb => ${url} - ${userId}`)

    return sql('user')
        .where('id', userId)
        .update({
            avatar: url
        })
        .then(x => {
            console.log('DONE!', x)

            return x
        })
}

server.use(async function(ctx) {
    // decode jwt and check auth against jwt server.
    const authHeader = ctx.headers.authorization
    const token = authHeader.split(' ')[1]
    const decodedToken = jwt.decode(token)
    const { id: userId } = decodedToken

    if (decodedToken) {
        console.log(`decodedToken => ${JSON.stringify(decodedToken)}`)

        const files = ctx.request.body.files || {}

        fileSystemJobQueue.push(() => processUpload(userId, files))
    } else {
        ctx.status = 401
        ctx.body = 'Unauthorized'
        throw new Error(ctx.body)
    }
})

server.listen(PORT, () => console.log(`Image upload server running on port ${PORT}...`))

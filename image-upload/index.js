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

server.use(async function(ctx) {
    // decode jwt and check auth against jwt server.
    const authHeader = ctx.headers.authorization
    const token = authHeader.split(' ')[1]
    const decodedToken = jwt.decode(token)

    if (decodedToken) {
        // create a temporary folder to store files
        const tmpdir = path.join(os.tmpdir(), uuid())

        // make the temporary directory
        await fs.mkdir(tmpdir)
        const filePaths = []
        const files = ctx.request.body.files || {}

        for (let key in files) {
            const file = files[key]
            const filePath = path.join(tmpdir, file.name)
            const reader = fs.createReadStream(file.path)
            const writer = fs.createWriteStream(filePath)

            reader.pipe(writer)
            filePaths.push(filePath)
            reader.on('end', () => {
                cloudinary.v2.uploader.upload(filePath,
                    (error, result) => {
                        if (error) console.error(`error => ${error}`)
                        console.log(`result => ${JSON.stringify(result.url)}`)
                        fs.unlink(filePath, error => {
                            if (error) {
                                console.error(`error => ${error}`)
                            } else {
                                sql('user')
                                    .where('id', decodedToken.id)
                                    .update({
                                        avatar: result.url
                                    })
                                    .then(x => {
                                        return x
                                    })
                            }
                        })
                    })
            })
        }

        ctx.body = 'Successful'
    } else {
        ctx.status = 401
        ctx.body = 'Unauthorized'
    }
})

server.listen(PORT, () => console.log(`Image upload server running on port ${PORT}...`))

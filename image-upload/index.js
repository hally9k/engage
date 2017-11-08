/* eslint-disable no-loop-func */
/* eslint-disable no-console */
import cors from 'koa-cors'
import dotenv from 'dotenv'
import os from 'os'
import path from 'path'
import Koa from 'koa'
import fs from 'fs-promise'
import koaBody from 'koa-body'
import uuid from 'uuid'
import cloudinary from 'cloudinary'
import sql from './connector/sql'
import redis from './connector/redis'
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

const IMAGE_UPLOAD_CHANNEL = 'imageUpload'

const DEFAULT_PORT = 8083
const PORT = process.env.PORT || DEFAULT_PORT

const RETRIES = 1000
const RETRY_TIMEOUT = 500

const server = new Koa()

server.use(cors())
server.use(koaBody({ multipart: true }))

const fileSystemJobQueue = queue({ autostart: true })
const cloudinaryJobQueue = queue({ autostart: true })
const databaseJobQueue = queue({ autostart: true })

const processUpload = async(userId, files, retries) => {
    try {
        // create a temporary folder to store files
        const tmpdir = path.join(os.tmpdir(), uuid())

        // make the temporary directory
        await fs.mkdir(tmpdir)
        const filePaths = []

        for (let key in files) {
            try {
                const file = files[key]

                console.log(`\nUploading ${file.name}.`)
                const filePath = path.join(tmpdir, file.name)
                const reader = fs.createReadStream(file.path)
                const writer = fs.createWriteStream(filePath)

                reader.pipe(writer)
                filePaths.push(filePath)

                return new Promise(resolve => {
                    reader.on('end', () => {
                        console.log(filePath)
                        cloudinaryJobQueue.push(() =>
                            uploadToCloudinary(filePath, userId, RETRIES)
                        )
                        resolve()
                    })
                })
            } catch (error) {
                throw new Error(error)
            }
        }
    } catch (error) {
        console.log('Failed to write to disk', error)
        if (retries > 0) {
            console.log(`Retrying ${error}`)
            setTimeout(
                () =>
                    fileSystemJobQueue.push(() =>
                        processUpload(userId, files, retries - 1)
                    ),
                RETRY_TIMEOUT
            )
        } else {
            console.log(
                `Failed to write ${error} to disk after ${RETRIES} retries`
            )
            redis.pub.publish(
                'image-upload',
                `{ "userId": ${userId}, "message": "Image upload failed." }`
            )
        }
    }
}

const uploadToCloudinary = (filePath, userId, retries) => {
    try {
        return cloudinaryJobQueue.push(() =>
            cloudinary.v2.uploader.upload(filePath, (error, result) => {
                if (error) throw new Error(filePath)
                fileSystemJobQueue.push(() =>
                    deleteFile(filePath, result.url, userId, RETRIES)
                )
            })
        )
    } catch (error) {
        console.log(`Failed to upload ${error}`)
        if (retries > 0) {
            console.log(`Retrying ${error}`)
            setTimeout(
                () =>
                    cloudinaryJobQueue.push(() =>
                        uploadToCloudinary(filePath, userId, retries - 1)
                    ),
                RETRY_TIMEOUT
            )
        } else {
            console.log(`Failed to upload ${filePath} after ${RETRIES} retries`)
            redis.pub.publish(
                'image-upload',
                `{ "userId": ${userId}, "message": "Image upload failed." }`
            )
        }
    }
}

const deleteFile = (filePath, url, userId, retries) => {
    try {
        return fs.unlink(filePath, error => {
            if (error) throw new Error(filePath)
            databaseJobQueue.push(() => setAvatarInTheDb(url, userId, RETRIES))
        })
    } catch (error) {
        console.log(`Failed to delete ${error}`)
        if (retries > 0) {
            console.log(`Retrying ${error}`)
            setTimeout(
                () =>
                    fileSystemJobQueue.push(() =>
                        deleteFile(filePath, url, userId, retries - 1)
                    ),
                RETRY_TIMEOUT
            )
        } else {
            console.error(
                `Failed to delete ${filePath} after ${RETRIES} retries`
            )
            redis.pub.publish(
                'image-upload',
                `{ "userId": ${userId}, "message": "Image upload failed." }`
            )
        }
    }
}

const setAvatarInTheDb = (url, userId, retries) => {
    try {
        return sql('user')
            .where('id', userId)
            .update({
                avatar: url
            })
            .returning('avatar')
            .then(url => {
                console.log(`Added uploaded image url to the db, ${url}`)
                redis.pub.publish(
                    `${userId}-${IMAGE_UPLOAD_CHANNEL}`,
                    `{ "userId": ${userId}, "message": "Image uploaded successfully." }`
                )
                console.log('Done.\n')

                return
            })
    } catch (error) {
        console.log(`Failed to set ${error} in the db`)
        if (retries > 0) {
            console.log(`Retrying ${error}`)
            setTimeout(
                () =>
                    // eslint-disable-next-line no-param-reassign
                    fileSystemJobQueue.push(() =>
                        setAvatarInTheDb(url, userId, retries - 1)
                    ),
                RETRY_TIMEOUT
            )
        } else {
            console.error(
                `Failed to set ${url} in the db after ${RETRIES} retries`
            )
            redis.pub.publish(
                'image-upload',
                `{ "userId": ${userId}, "message": "Image upload failed." }`
            )
        }
    }
}

server.use(async function(ctx) {
    const authHeader = ctx.headers.authorization
    const token = authHeader.split(' ')[1]
    const decodedToken = jwt.decode(token)
    const { id: userId } = decodedToken

    if (decodedToken) {
        const files = ctx.request.body.files || {}

        fileSystemJobQueue.push(() => processUpload(userId, files, RETRIES))

        ctx.status = 200
        ctx.body = { 200: 'Scheduled' }
    } else {
        ctx.status = 401
        ctx.body = { 401: 'Unauthorized' }
        throw new Error(ctx.body)
    }
})

server.listen(PORT, () =>
    console.log(`Image upload server running on port ${PORT}...`)
)

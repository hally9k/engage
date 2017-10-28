/* eslint-disable compat/compat */
import IMAGE_UPLOAD_SERVER_URL from '../../config/image'
import { withToken } from 'utility/auth'

export const avatarUrl =
    'http://res.cloudinary.com/hally9k/image/upload/c_crop,e_loop,g_face,h_600,q_auto:eco,r_300,w_600,x_0,y_0/v1508827630/'

const options = (body, method) => ({
    headers: withToken({}),
    method,
    body
})

export const uploadImage = file => {
    const formData = new FormData()

    formData.append('file', file)

    return fetch(IMAGE_UPLOAD_SERVER_URL, options(formData, 'POST')).then(res =>
        res.json()
    )
}

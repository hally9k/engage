import { uploadImage } from 'utility/image'
import { error } from 'duck/meta'

// Actions
const AVATAR_UPLOAD_REQUESTED = 'avatar/UPLOAD_REQUESTED'
const AVATAR_UPLOAD_SCHEDULED = 'avatar/AVATAR_UPLOAD_SCHEDULED'

export const avatarUploadRequested = payload => ({
    type: AVATAR_UPLOAD_REQUESTED,
    payload
})

export const avatarUploadScheduled = () => ({
    type: AVATAR_UPLOAD_SCHEDULED
})

// Epics
export const avatarUploadRequestedEpic = action$ =>
    action$.ofType(AVATAR_UPLOAD_REQUESTED).mergeMap(({ payload: file }) => {
        return uploadImage(file)
            .then(() => {
                return [avatarUploadScheduled()]
            })
            .catch(() => {
                return [error('Image upload failed.')]
            })
    })

export const epics = {
    avatarUploadRequestedEpic
}

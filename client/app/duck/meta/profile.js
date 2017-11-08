import { Map } from 'immutable'
import { createReducer } from 'redux-immutablejs'
import { uploadImage } from 'utility/image'
import { error } from 'duck/meta'
import { fetchingUser } from 'duck/data/user-actions'
import imageUploadSubscription from 'graphql/subscription/image-upload'
import { subscribe, unsubscribe } from 'redux-graphql-subscriptions'

export const IMAGE_UPLOAD_CHANNEL = 'imageUpload'

// Actions
const AVATAR_UPLOAD_REQUESTED = 'avatar/UPLOAD_REQUESTED'
const AVATAR_UPLOAD_SCHEDULED = 'avatar/UPLOAD_SCHEDULED'

export const AVATAR_UPLOAD_SUCCESS = 'avatar/UPLOAD_SUCCESS'
const AVATAR_UPLOAD_FAILURE = 'avatar/UPLOAD_FAILURE'

export const avatarUploadRequested = payload => ({
    type: AVATAR_UPLOAD_REQUESTED,
    payload
})

export const avatarUploadScheduled = () => ({
    type: AVATAR_UPLOAD_SCHEDULED
})

export const avatarUploadSuccess = payload => {
    const res = JSON.parse(payload)

    return {
        type: AVATAR_UPLOAD_SUCCESS,
        payload: res.userId,
        success: res.message
    }
}

export const avatarUploadFailure = error => ({
    type: AVATAR_UPLOAD_FAILURE,
    error
})

const imageUpload = {
    query: imageUploadSubscription,
    success: avatarUploadSuccess,
    failure: avatarUploadFailure
}

export const subscribeToImageUpload = userId =>
    subscribe({
        ...imageUpload,
        variables: { channel: IMAGE_UPLOAD_CHANNEL, userId }
    })

export const unsubscribeFromImageUpload = () =>
    unsubscribe(IMAGE_UPLOAD_CHANNEL)

// Reducer
export const INITIAL_STATE = Map({
    success: false
})

export default createReducer(INITIAL_STATE, {
    [AVATAR_UPLOAD_REQUESTED]: state => state.set('success', false),
    [AVATAR_UPLOAD_SCHEDULED]: state => state.set('success', true)
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

export const avatarUploadSuccessEpic = action$ =>
    action$
        .ofType(AVATAR_UPLOAD_SUCCESS)
        .mergeMap(({ payload: userId }) => [fetchingUser(userId)])

export const epics = {
    avatarUploadRequestedEpic,
    avatarUploadSuccessEpic
}

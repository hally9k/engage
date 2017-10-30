import { Map } from 'immutable'
import { createReducer } from 'redux-immutablejs'
import { uploadImage } from 'utility/image'
import { error } from 'duck/meta'
import imageUploadSubscription from 'graphql/subscription/image-upload'
import { subscribe, unsubscribe } from 'redux-graphql-subscriptions'

// Actions
const AVATAR_UPLOAD_REQUESTED = 'avatar/UPLOAD_REQUESTED'
const AVATAR_UPLOAD_SCHEDULED = 'avatar/AVATAR_UPLOAD_SCHEDULED'

const AVATAR_UPLOAD_SUCCESS = 'avatar/AVATAR_UPLOAD_SUCCESS'
const AVATAR_UPLOAD_FAILURE = 'avatar/AVATAR_UPLOAD_FAILURE'

export const avatarUploadRequested = payload => ({
    type: AVATAR_UPLOAD_REQUESTED,
    payload
})

export const avatarUploadScheduled = () => ({
    type: AVATAR_UPLOAD_SCHEDULED
})

export const avatarUploadSuccess = success => ({
    type: AVATAR_UPLOAD_SUCCESS,
    success
})

export const avatarUploadFailure = error => ({
    type: AVATAR_UPLOAD_FAILURE,
    error
})

const imageUpload = {
    query: imageUploadSubscription,
    success: avatarUploadSuccess,
    failure: avatarUploadFailure
}

export const subscribeToImageUpload = () =>
    subscribe({ ...imageUpload, variables: { channel: 'image-upload' } })

export const unsubscribeFromImageUpload = () => unsubscribe('image-upload')

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

export const epics = {
    avatarUploadRequestedEpic
}

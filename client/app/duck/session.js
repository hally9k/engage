import { Map } from 'immutable'
import * as auth from 'utility/auth'

// Actions
const SENDING_LOGIN_REQUEST = 'session/SENDING_LOGIN_REQUEST'
const RECEIVED_LOGIN_RESPONSE = 'session/RECEIVED_LOGIN_RESPONSE'
// const SENDING_TOKEN_VALIDATION = 'session/SENDING_TOKEN_VALIDATION'
// const RECEIVED_TOKEN_VALIDATION = 'session/RECEIVED_TOKEN_VALIDATION'

// Action Creators
export const sendingLoginRequest = (username, password) => ({
    type: SENDING_LOGIN_REQUEST,
    payload: { username, password }
})

export const receivedLoginResponse = (payload, error) => ({
    type: RECEIVED_LOGIN_RESPONSE,
    payload,
    error
})

// export const sendingTokenValidation = payload => ({
//     type: SENDING_TOKEN_VALIDATION,
//     payload
// })
//
// export const receivedTokenValidation = payload => ({
//     type: RECEIVED_TOKEN_VALIDATION,
//     payload
// })

// Reducers
const INITIAL_STATE = Map()

export default (state = INITIAL_STATE, action) => {
    if (!action) return state
    switch (action.type) {
        case RECEIVED_LOGIN_RESPONSE:
            return Map(action.payload)
        default:
            return state
    }
}

// Epics
export const sendingLoginRequestEpic = action$ =>
    action$.ofType(SENDING_LOGIN_REQUEST).mergeMap(
        ({ payload: { username, password } }) =>
            auth
                .login(username, password)
                .then(res => receivedLoginResponse(res))
        // .catch(error => [receivedLoginResponse(null, error)])
    )

// export const receivedLoginRequestEpic = action$ =>
//     action$.ofType(RECEIVED_LOGIN_RESPONSE).mergeMap(({ payload }) => {
//         return payload
//     })

export const epics = {
    sendingLoginRequestEpic
    // receivedLoginRequestEpic
}

import { Map } from 'immutable'
import * as auth from 'utility/auth'
import { routes } from 'router'

import { error } from 'duck/meta'

import { LOCAL_STORAGE_SESSION_KEY } from '../../config/auth'

// Actions
const SENDING_LOGIN_REQUEST = 'session/SENDING_LOGIN_REQUEST'
const RECEIVED_LOGIN_RESPONSE = 'session/RECEIVED_LOGIN_RESPONSE'
const SENDING_REGISTER_REQUEST = 'session/SENDING_REGISTER_REQUEST'
const RECEIVED_REGISTER_RESPONSE = 'session/RECEIVED_REGISTER_RESPONSE'
const LOGGING_OUT = 'session/LOGGING_OUT'
const SETTING_TOKEN_FROM_LOCAL_STORAGE =
    'session/SETTING_TOKEN_FROM_LOCAL_STORAGE'

// Action Creators
export const sendingLoginRequest = (email, password) => ({
    type: SENDING_LOGIN_REQUEST,
    payload: { email, password }
})

export const receivedLoginResponse = (payload, error) => ({
    type: RECEIVED_LOGIN_RESPONSE,
    payload,
    error
})

export const sendingRegisterRequest = (
    firstName,
    lastName,
    email,
    password
) => ({
    type: SENDING_REGISTER_REQUEST,
    payload: { firstName, lastName, email, password }
})

export const receivedRegisterResponse = (payload, error) => ({
    type: RECEIVED_REGISTER_RESPONSE,
    payload,
    error
})

export const loggingOut = () => ({ type: LOGGING_OUT })

export const settingTokenFromLocalStorage = payload => ({
    type: SETTING_TOKEN_FROM_LOCAL_STORAGE,
    payload
})

// Reducers
const INITIAL_STATE = Map()

export default (state = INITIAL_STATE, action) => {
    if (!action) return state
    switch (action.type) {
        case RECEIVED_LOGIN_RESPONSE:
            return Map(action.payload)
        case RECEIVED_REGISTER_RESPONSE:
            return Map(action.payload)
        case LOGGING_OUT:
            return Map()
        case SETTING_TOKEN_FROM_LOCAL_STORAGE:
            return Map(action.payload)
        default:
            return state
    }
}

// Epics
export const sendingLoginRequestEpic = action$ =>
    action$
        .ofType(SENDING_LOGIN_REQUEST)
        .mergeMap(({ payload: { email, password } }) =>
            auth
                .login(email, password)
                .then(
                    res =>
                        res
                            ? [
                                receivedLoginResponse(res),
                                { type: routes.HOME }
                            ]
                            : [error('Username or password incorrect.')]
                )
                .catch(error => [error(error)])
        )

export const sendingRegisterRequestEpic = action$ =>
    action$
        .ofType(SENDING_REGISTER_REQUEST)
        .mergeMap(({ payload: { firstName, lastName, email, password } }) =>
            auth
                .register(firstName, lastName, email, password)
                .then(
                    res =>
                        res
                            ? [
                                receivedLoginResponse(res),
                                { type: routes.HOME }
                            ]
                            : [error('Username or password incorrect.')]
                )
                .catch(error => [error(error)])
        )

export const logginOutEpic = action$ =>
    action$.ofType(LOGGING_OUT).mergeMap(() => {
        localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY)
    })

export const epics = {
    sendingLoginRequestEpic,
    sendingRegisterRequestEpic,
    logginOutEpic
}

/* eslint-disable compat/compat */
import { routeMap } from '../router'
import jwt from 'jsonwebtoken'
import { settingTokenFromLocalStorage } from 'duck/meta/session'

import AUTH_SERVER_URL, { LOCAL_STORAGE_SESSION_KEY } from '../../config/auth'

const options = (body, method) => ({
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    method,
    body: JSON.stringify(body)
})

export const withToken = headers => {
    const session = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY)

    return session
        ? {
            ...headers,
            authorization: `JWT ${JSON.parse(session).token}`
        }
        : headers
}

const extractJson = res => res.json()

const processLoginResponse = ({ token }) => {
    const decodedToken = jwt.decode(token)

    if (!decodedToken) return null

    const { roles, id: userId } = decodedToken
    const session = { token, roles, userId }

    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(session))

    return session
}

export const isAuthorised = (type, state, dispatch) => {
    const session = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY)

    let roles

    if (session) {
        const parsedSession = JSON.parse(session)

        dispatch(settingTokenFromLocalStorage(parsedSession))
        roles = parsedSession.roles
    }

    if (!routeMap[type]) return false

    const requiredRole = routeMap[type].role

    if (!requiredRole) return true
    if (!roles) roles = state.getIn(['session', 'roles'])

    if (!roles) return false

    return roles.includes(requiredRole)
}

export const isLoggedIn = state => {
    return Boolean(state.getIn(['session', 'token']))
}

export const login = (email, password) =>
    fetch(`${AUTH_SERVER_URL}/login`, options({ email, password }, 'POST'))
        .then(extractJson)
        .then(processLoginResponse)

export const register = (firstName, lastName, email, password) =>
    fetch(
        `${AUTH_SERVER_URL}/register`,
        options({ firstName, lastName, email, password }, 'POST')
    )
        .then(extractJson)
        .then(processLoginResponse)

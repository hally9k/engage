/* eslint-disable compat/compat */
import { routeMap } from '../router'
import jwt from 'jsonwebtoken'
import { settingTokenFromLocalStorage } from 'duck/session'

import AUTH_SERVER_URL from '../../config/auth'

const options = (body, method) => ({
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    method,
    body: JSON.stringify(body)
})

const extractJson = res => res.json()

const processLoginResponse = ({ token }) => {
    const decodedToken = jwt.decode(token)

    if (!decodedToken) return null

    const { roles, id: userId } = decodedToken
    const session = { token, roles, userId }

    localStorage.setItem('engage:session', JSON.stringify(session))

    return session
}

export const isAuthorised = (type, state, dispatch) => {
    const session = localStorage.getItem('engage:session')

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

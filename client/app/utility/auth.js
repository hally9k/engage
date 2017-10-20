/* eslint-disable compat/compat */
import { routes } from '../router'
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
    const { roles } = jwt.decode(token)
    const session = { token, roles }

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

    if (!routes[type]) return false

    const requiredRole = routes[type].role

    if (!requiredRole) return true
    if (!roles) roles = state.getIn(['session', 'roles'])

    if (!roles) return false

    return roles.includes(requiredRole)
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

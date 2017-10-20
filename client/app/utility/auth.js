/* eslint-disable compat/compat */
import { routes } from '../router'
import jwt from 'jsonwebtoken'

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

    localStorage.setItem('engage:session', session)

    return session
}

export const isAuthorised = (type, state) => {
    const requiredRole = routes[type].role

    if (!requiredRole) return true
    const roles = state.getIn(['session', 'roles'])

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

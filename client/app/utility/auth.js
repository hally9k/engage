/* eslint-disable compat/compat */
import { routes } from '../router'
import jwt from 'jsonwebtoken'

import AUTH_SERVER_URL from '../../config/auth'

export const isAuthorised = (type, state) => {
    const requiredRole = routes[type].role

    if (!requiredRole) return true
    const roles = state.getIn(['session', 'roles'])

    if (!roles) return false

    return roles.includes(requiredRole)
}

export const login = (username, password) =>
    fetch(`${AUTH_SERVER_URL}/login`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ email: username, password })
    })
        .then(res => res.json())
        .then(({ token }) => {
            const { roles } = jwt.decode(token)
            const session = { token, roles }

            localStorage.setItem('engage:session', session)

            return session
        })

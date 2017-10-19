/* eslint-disable compat/compat */
import { routes } from '../router'

import AUTH_SERVER_URL from '../../config/auth'

export const isAuthorised = (type, state) =>
    routes[type].role === state.getIn(['session', 'token', 'role'])

export const login = (username, password) =>
    fetch(`${AUTH_SERVER_URL}/login`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ email: username, password })
    }).then(res => res.data)

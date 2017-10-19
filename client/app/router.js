import { connectRoutes, redirect } from 'redux-first-router'
import createHistory from 'history/createBrowserHistory'
import { fromJS } from 'immutable'
import { roles } from '../config/auth'
import { isAuthorised } from './utility/auth'

const history = createHistory()

const options = {
    location: state => toJS(state.get('location')),
    onBeforeChange: (dispatch, getState, action) => {
        const authorised = isAuthorised(action.type, getState())

        if (!authorised) {
            const action = redirect({ type: 'HOME' })

            dispatch(action)
        }
    }
    // onAfterChange: (dispatch, getState) => {
    // }
}

export const routes = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    ACTIVITIES: {
        path: '/activities',
        role: roles.USER
    },
    CHAT_INDEX: {
        path: '/chat',
        role: roles.ADMIN
    },
    CHAT: {
        path: '/chat/:channel',
        role: roles.ADMIN
    }
}

const { reducer, enhancer, middleware, thunk } = connectRoutes(
    history,
    routes,
    options
)

// Immutable helpers
const toJS = x => {
    if (x && typeof x.toJS === 'function') {
        return x.toJS()
    }

    return x
}

const wrapReducer = innerReducer => (state, action) => {
    return fromJS(innerReducer(toJS(state), action))
}

export default { reducer: wrapReducer(reducer), enhancer, middleware, thunk }

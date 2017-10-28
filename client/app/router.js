import { connectRoutes, redirect } from 'redux-first-router'
import createHistory from 'history/createBrowserHistory'
import { fromJS } from 'immutable'
import { roles } from '../config/auth'
import { isAuthorised, isLoggedIn } from './utility/auth'

const history = createHistory()

const options = {
    location: state => toJS(state.get('location')),
    onBeforeChange: (dispatch, getState, action) => {
        const authorised = isAuthorised(action.type, getState(), dispatch)

        if (!authorised) {
            const loggedIn = isLoggedIn(getState())

            if (loggedIn) {
                dispatch(redirect({ type: routes.UNAUTHORIZED }))
            } else {
                dispatch(redirect({ type: routes.LOGIN }))
            }
        }
    }
    // onAfterChange: (dispatch, getState) => {
    // }
}

export const routes = {
    HOME: 'router/HOME',
    LOGIN: 'router/LOGIN',
    REGISTER: 'router/REGISTER',
    ACTIVITIES: 'router/ACTIVITIES',
    CHAT_INDEX: 'router/CHAT_INDEX',
    CHAT: 'router/CHAT',
    PROFILE: 'router/PROFILE',
    UNAUTHORIZED: 'router/UNAUTHORIZED'
}

export const routeMap = {
    [routes.HOME]: {
        path: '/',
        role: roles.USER
    },
    [routes.LOGIN]: {
        path: '/login'
    },
    [routes.REGISTER]: {
        path: '/register'
    },
    [routes.ACTIVITIES]: {
        path: '/activities',
        role: roles.USER
    },
    [routes.CHAT_INDEX]: {
        path: '/chat',
        role: roles.ADMIN
    },
    [routes.CHAT]: {
        path: '/chat/:channel',
        role: roles.ADMIN
    },
    [routes.PROFILE]: {
        path: '/profile',
        role: roles.USER
    },
    [routes.UNAUTHORIZED]: {
        path: '/unauthorized'
    }
}

const { reducer, enhancer, middleware, thunk } = connectRoutes(
    history,
    routeMap,
    options
)

// Immutable helpers
// TODO: Replace this with Immutable.Iterable.isIterable() check?
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

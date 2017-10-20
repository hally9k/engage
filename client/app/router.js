import { connectRoutes, redirect } from 'redux-first-router'
import createHistory from 'history/createBrowserHistory'
import { fromJS } from 'immutable'
import { roles } from '../config/auth'
import { isAuthorised } from './utility/auth'

const history = createHistory()

const options = {
    location: state => toJS(state.get('location')),
    onBeforeChange: (dispatch, getState, action) => {
        const authorised = isAuthorised(
            action.action.type,
            getState(),
            dispatch
        )

        if (!authorised) {
            const action = redirect({ type: 'UNAUTHORIZED' })

            dispatch(action)
        }
    }
    // onAfterChange: (dispatch, getState) => {
    // }
}

export const routes = {
    'router/HOME': {
        path: '/'
    },
    'router/LOGIN': {
        path: '/login'
    },
    'router/REGISTER': {
        path: '/register'
    },
    'router/ACTIVITIES': {
        path: '/activities',
        role: roles.USER
    },
    'router/CHAT_INDEX': {
        path: '/chat',
        role: roles.ADMIN
    },
    'router/CHAT': {
        path: '/chat/:channel',
        role: roles.ADMIN
    },
    'router/UNAUTHORIZED': {
        path: '/unauthorized'
    }
}

const { reducer, enhancer, middleware, thunk } = connectRoutes(
    history,
    routes,
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

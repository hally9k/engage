import { connectRoutes } from 'redux-first-router'
import createHistory from 'history/createBrowserHistory'
import { fromJS } from 'immutable'

const history = createHistory()

const options = {
    location: state => toJS(state.get('location')),
}

const routes = {
    HOME: '/',
    ACTIVITIES: '/activities',
    CHAT_INDEX: '/chat',
    CHAT: {
        path: '/chat/:channel',
    },
}

const { reducer, enhancer, middleware, thunk } = connectRoutes(
    history,
    routes,
    options,
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

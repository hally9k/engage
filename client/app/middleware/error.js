import { error, errorReset } from 'duck/meta'

function createErrorMiddleware() {
    return ({ dispatch }) => next => action => {
        if (action.error) dispatch(error(action.error))
        if (action.type.includes('router/')) dispatch(errorReset())
        next(action)
    }
}

export default createErrorMiddleware()

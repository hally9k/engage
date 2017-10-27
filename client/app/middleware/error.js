import { error } from 'duck/meta'

function createErrorMiddleware() {
    return ({ dispatch }) => next => action => {
        if (action.error) dispatch(error(action.error))
        next(action)
    }
}

export default createErrorMiddleware()

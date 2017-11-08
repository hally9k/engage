import { success, successReset, error, errorReset } from 'duck/meta'

function createErrorMiddleware() {
    return ({ dispatch }) => next => action => {
        if (action.error) dispatch(error(action.error))
        if (action.success) dispatch(success(action.success))
        if (action.type.includes('router/')) {
            dispatch([errorReset(), successReset()])
        }
        next(action)
    }
}

export default createErrorMiddleware()

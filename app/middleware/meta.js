import { loadingMeta, loadedMeta } from 'duck/meta'

function createMetaMiddleware() {
    return ({ dispatch }) => next => action => {
        if (action.type.includes('FETCHING')) dispatch(loadingMeta())
        if (action.type.includes('RECEIVED')) dispatch(loadedMeta())

        return next(action)
    }
}

const metaMiddleware = createMetaMiddleware()

export default metaMiddleware

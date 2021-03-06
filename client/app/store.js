import batchMiddleware from 'middleware/batch'
import metaMiddleware from 'middleware/meta'
import { createEpicMiddleware } from 'redux-observable'
import createRavenMiddleware from 'middleware/raven'
import errorMiddleware from 'middleware/error'
import loggerMiddleware from 'middleware/logger'
import graphQLSubscriptionsMiddleware from 'middleware/subscriptions'
import { applyMiddleware, compose, createStore } from 'redux'
import { epics, reducers } from 'duck'
import router from 'router'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // eslint-disable-line no-underscore-dangle

const epicMiddleware = createEpicMiddleware(epics)
const ravenMiddleware = createRavenMiddleware()

const enhancer = composeEnhancers(
    router.enhancer,
    applyMiddleware(
        batchMiddleware,
        errorMiddleware,
        router.middleware,
        metaMiddleware,
        ravenMiddleware,
        epicMiddleware,
        loggerMiddleware,
        graphQLSubscriptionsMiddleware
    )
)

let store

// Hot Module Replacement
if (module.hot) {
    module.hot.accept('duck', () => {
        const rootEpic = require('duck').epics

        epicMiddleware.replaceEpic(rootEpic) // Swap out epic middleware
        const rootReducer = require('duck').reducers

        store.replaceReducer(rootReducer)
    })
}

export function configureStore() {
    store = createStore(reducers, enhancer)

    return store
}

export { store }

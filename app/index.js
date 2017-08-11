/* eslint-disable sort-imports */
import { configureStore } from './store'
import { Provider } from 'react-redux'
import React from 'react'
import { render } from 'react-dom'
import './rxjs'
import Root from 'component/unique/root.container'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import commentSubscription from 'graphql/subscription/comment'
import './style/index.css'

const store = configureStore()

render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('root')
)

const wsClient = new SubscriptionClient('ws://localhost:8001/subscriptions')

wsClient.subscribe(
    {
        query: commentSubscription
    },
    (error, res) => {
        store.dispatch({
            type: 'comment/RECEIVED_NEW_COMMENT',
            payload: res.newComment
        })
    }
)

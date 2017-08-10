/* eslint-disable sort-imports */
import { configureStore } from './store'
import { Provider } from 'react-redux'
import React from 'react'
import { render } from 'react-dom'
import './rxjs'
import Root from 'component/unique/root.container'
import { SubscriptionClient } from 'subscriptions-transport-ws'
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
        query: `subscription($userId: ID!, $message: String!) {
             newComment(userId: $userId, message: $message) {
              	userId,
              	message
            	}
            }
        `,
        variables: {
            userId: 1,
            message: 'Hello!'
        }
    },
    (error, { newComment }) => {
        store.dispatch({ type: 'NEW_COMMENT', payload: newComment })
    }
)

/* eslint-disable sort-imports */
import { configureStore } from './store'
import { Provider } from 'react-redux'
import React from 'react'
import { render } from 'react-dom'
import './rxjs'
import Root from 'component/unique/root.container'

const store = configureStore()

render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('root')
)

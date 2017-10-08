/* eslint-disable sort-imports */
import { AppContainer } from 'react-hot-loader'
import { configureStore } from './store'
import { Provider } from 'react-redux'
import React from 'react'
import { render } from 'react-dom'
import './rxjs'
import Root from 'component/unique/root.container'
import './style/index.css'

const store =
    module.hot && module.hot.data && module.hot.data.store
        ? module.hot.data.store
        : configureStore()

render(
    <AppContainer>
        <Provider store={store}>
            <Root />
        </Provider>
    </AppContainer>,
    document.getElementById('root'),
)

if (module.hot) {
    module.hot.accept(() => {
        render(Root)
    })
}

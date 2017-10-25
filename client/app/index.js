import { AppContainer } from 'react-hot-loader'
import { configureStore } from './store'
import { Provider } from 'react-redux'
import React from 'react'
import { render } from 'react-dom'
import './rxjs'
import Root from 'component/page/root.container'
import './style/index.scss'

const store =
    module.hot && module.hot.data && module.hot.data.store
        ? module.hot.data.store
        : configureStore()

const getApp = store => (
    <AppContainer>
        <Provider store={store}>
            <Root />
        </Provider>
    </AppContainer>
)

render(getApp(store), document.getElementById('root'))

if (module.hot) {
    module.hot.accept('component/page/root.container', () => {
        const store = require('./store').store

        render(getApp(store), document.getElementById('root'))
    })
}

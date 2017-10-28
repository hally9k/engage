import React from 'react'

import loading from 'style/atom/loading.scss'

const css = {
    ...loading
}

const Loading = () => (
    <div className={css['engage-initial-loading-container']}>
        <div className={css['engage-initial-loading-spinner']}>
            <div className={css['engage-initial-loading-bounce1']} />
            <div className={css['engage-initial-loading-bounce2']} />
            <div className={css['engage-initial-loading-bounce3']} />
        </div>
    </div>
)

export default Loading

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import errorBar from 'style/organism/error-bar.scss'

const css = {
    ...errorBar
}

const ErrorBar = props => (
    <div
        className={classnames(css['error-bar'], {
            [css.active]: props.error
        })}
    >
        <p>{props.error}</p>
    </div>
)

ErrorBar.propTypes = {
    error: PropTypes.string
}

export default ErrorBar

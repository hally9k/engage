import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import successBar from 'style/organism/success-bar.scss'

const css = {
    ...successBar
}

const SuccessBar = props => (
    <div
        className={classnames(css['success-bar'], {
            [css.active]: props.success
        })}
    >
        <p>{props.success}</p>
    </div>
)

SuccessBar.propTypes = {
    success: PropTypes.string
}

export default SuccessBar

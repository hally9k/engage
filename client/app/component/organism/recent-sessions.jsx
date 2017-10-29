import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import recentSessions from 'style/organism/recent-sessions.scss'

const css = {
    ...recentSessions
}

const RecentSessions = props => (
    <div
        className={classnames(css['error-bar'], {
            [css.active]: props.error
        })}
    >
        <p>{props.error}</p>
    </div>
)

Error.propTypes = {
    error: PropTypes.string
}

export default RecentSessions

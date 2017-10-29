import React from 'react'
import PropTypes from 'prop-types'

import Session from 'component/molecule/session'

import recentSessions from 'style/organism/recent-sessions.scss'

const css = {
    ...recentSessions
}

const RecentSessions = props => {
    return (
        <div className={css['recent-sessions']}>
            {props.recentSessions.map(session => (
                <Session session={session} key={`session-${session.id}`} />
            ))}
        </div>
    )
}

RecentSessions.propTypes = {
    recentSessions: PropTypes.array.isRequired
}

export default RecentSessions
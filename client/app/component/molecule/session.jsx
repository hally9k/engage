import React, { Component } from 'react'
import PropTypes from 'prop-types'

import session from 'style/molecule/session.scss'

const css = {
    ...session
}

export default class Session extends Component {
    static propTypes = {
        activity: PropTypes.object.isRequired,
        session: PropTypes.object.isRequired,
        subject: PropTypes.object.isRequired
    }

    render() {
        const { activity, session, subject } = this.props

        return (
            <div className={css.session}>
                <div>
                    <h2 className={css.activity}>{activity.description}</h2>
                    <h5 className={css.subject}>{subject.title}</h5>
                    <p className={css.score}>{session.score}</p>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import session from 'style/molecule/session.scss'

const css = {
    ...session
}

export default class Session extends Component {
    static propTypes = {
        session: PropTypes.object.isRequired
    }

    render() {
        const { session } = this.props

        return (
            <div className={css.session}>
                <div className={css.badge}>
                    <h2 className={css.activity}>
                        {session.activity.description}
                    </h2>
                    <h5 className={css.subject}>
                        {session.activity.subject.title}
                    </h5>
                    <p className={css.score}>{session.score}</p>
                </div>
            </div>
        )
    }
}

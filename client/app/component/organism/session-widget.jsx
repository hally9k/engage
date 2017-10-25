import PropTypes from 'prop-types'
import React, { Component } from 'react'
import sessionWidget from 'style/organism/session-widget.scss'

const css = {
    ...sessionWidget
}

export default class SessionWidget extends Component {
    static propTypes = {
        currentUser: PropTypes.object.isRequired,
        loggingOut: PropTypes.func.isRequired,
        session: PropTypes.object.isRequired
    }

    render() {
        return <h1 className={css['session-widget']}>Session Widget</h1>
    }
}

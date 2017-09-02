import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Activities from './activities.container'
import Messenger from './messenger.container'

export default class Root extends Component {
    handleFetchingChild = () => {
        this.props.updateComponentState({ childId: this.childId.value })
        this.props.fetchingChild(this.childId.value)
    }
    handleFetchingSubject = () => {
        this.props.updateComponentState({ subjectId: this.subjectId.value })
        this.props.fetchingSubject(this.subjectId.value)
    }
    handleFetchingUser = () => {
        this.props.updateComponentState({ userId: this.userId.value })
        this.props.fetchingUser(this.userId.value)
    }

    render() {
        // const { user, child, subject, fetching } = this.props

        return (
            <div>
                <Activities subjectId="1" />
                <Messenger />
            </div>
        )
    }
}

Root.propTypes = {
    child: PropTypes.object,
    fetching: PropTypes.bool,
    fetchingChild: PropTypes.func.isRequired,
    fetchingSubject: PropTypes.func.isRequired,
    fetchingUser: PropTypes.func.isRequired,
    meta: PropTypes.object,
    subject: PropTypes.object,
    updateComponentState: PropTypes.func.isRequired,
    user: PropTypes.object,
}

import PropTypes from 'prop-types'
import React, { Component } from 'react'

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
        const { user, child, subject, fetching } = this.props

        return (
            <div>
                <button onClick={this.handleFetchingChild}>CHILD</button>
                <input
                    type="number"
                    ref={childId => {
                        this.childId = childId
                    }}
                />
                <button onClick={this.handleFetchingSubject}>SUBJECT</button>
                <input
                    type="number"
                    ref={subjectId => {
                        this.subjectId = subjectId
                    }}
                />
                <button onClick={this.handleFetchingUser}>USER</button>
                <input
                    type="number"
                    ref={userId => {
                        this.userId = userId
                    }}
                />

                {(fetching && 'loading...') ||
                    <div>
                        {child &&
                            <div>
                                <h1>CHILD</h1>
                                {JSON.stringify(child)}
                            </div>}
                        {subject &&
                            <div>
                                <h1>SUBJECT</h1>
                                {JSON.stringify(subject)}
                            </div>}
                        {user &&
                            <div>
                                <h1>USER</h1>
                                {JSON.stringify(user)}
                            </div>}
                    </div>}
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
    user: PropTypes.object
}

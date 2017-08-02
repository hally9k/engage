import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class Root extends Component {
    render() {
        const {
            user,
            child,
            subject,
            meta: { fetching },
            fetchingChild,
            fetchingSubject,
            fetchingUser
        } = this.props

        return (
            <div>
                <button onClick={fetchingChild}>CHILD</button>
                <button onClick={fetchingSubject}>SUBJECT</button>
                <button onClick={fetchingUser}>USER</button>
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
    fetchingChild: PropTypes.func.isRequired,
    fetchingSubject: PropTypes.func.isRequired,
    fetchingUser: PropTypes.func.isRequired,
    meta: PropTypes.object.isRequired,
    subject: PropTypes.object,
    user: PropTypes.object
}

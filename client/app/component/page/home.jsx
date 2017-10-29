import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Child from 'component/molecule/child'
import Session from 'component/molecule/session'

import home from 'style/page/home.scss'

const css = {
    ...home
}

export default class Home extends Component {
    static propTypes = {
        currentUser: PropTypes.object.isRequired,
        fetchingUser: PropTypes.func.isRequired
    }

    componentWillMount = () => {
        const { fetchingUser, currentUser } = this.props

        fetchingUser(currentUser.id)
    }

    render() {
        const { currentUser } = this.props

        return (
            <div className={css.home}>
                {currentUser &&
                    currentUser.children.map(child => (
                        <div key={`child-${child.id}`}>
                            <Child child={child} />
                            <div className={css.sessions}>
                                {child.subjects &&
                                    child.subjects.map(subject => {
                                        return (
                                            subject.activities &&
                                            subject.activities.map(activity => {
                                                return (
                                                    activity.sessions &&
                                                    activity.sessions.map(
                                                        session => (
                                                            <Session
                                                                session={
                                                                    session
                                                                }
                                                                activity={
                                                                    activity
                                                                }
                                                                subject={
                                                                    subject
                                                                }
                                                                key={`session-${session.id}`}
                                                            />
                                                        )
                                                    )
                                                )
                                            })
                                        )
                                    })}
                            </div>
                        </div>
                    ))}
            </div>
        )
    }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Child from 'component/molecule/child'
import RecentSessions from 'component/organism/recent-sessions.container'

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
                            <RecentSessions childId={child.id} n={5} />
                        </div>
                    ))}
            </div>
        )
    }
}

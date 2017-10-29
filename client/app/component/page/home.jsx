import React, { Component } from 'react'
import PropTypes from 'prop-types'

import UserAvatar from 'component/molecule/user-avatar'
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
                        <div className={css.child} key={`child-${child.id}`}>
                            <div className={css.avatar}>
                                <UserAvatar user={child} size={'medium'} />
                            </div>
                            <div className={css.details}>
                                <div>
                                    <h1>{child.firstName}</h1>
                                </div>
                                <div>
                                    <h1>{child.lastName}</h1>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        )
    }
}

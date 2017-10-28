import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { avatarUrl } from 'utility/image'
import classnames from 'classnames'

import userAvatar from 'style/molecule/user-avatar.scss'

const css = {
    ...userAvatar
}

export default class UserAvatar extends Component {
    static propTypes = {
        size: PropTypes.string.isRequired,
        user: PropTypes.object.isRequired
    }

    render() {
        const { user } = this.props

        const avatarUrlArray = user.avatar.split('/')

        const avatarImage = avatarUrlArray[avatarUrlArray.length - 1]

        return (
            <img
                className={classnames(css['user-avatar'], css[this.props.size])}
                src={`${avatarUrl}${avatarImage}`}
                alt="user's avatar."
            />
        )
    }
}

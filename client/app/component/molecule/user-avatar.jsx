import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { avatarUrl } from 'utility/image'

import userAvatar from 'style/molecule/user-avatar.scss'

const css = {
    ...userAvatar
}

export default class UserAvatar extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired
    }

    render() {
        const { user } = this.props

        const avatarUrlArray = user.avatar.split('/')

        const avatarImage = avatarUrlArray[avatarUrlArray.length - 1]

        return (
            <img
                className={css['user-avatar']}
                src={`${avatarUrl}${avatarImage}`}
                alt="user's avatar."
            />
        )
    }
}

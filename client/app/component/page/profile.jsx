import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ImageUpload from 'component/molecule/image-upload'
import UserAvatar from 'component/molecule/user-avatar'
import profile from 'style/page/profile.scss'

const css = {
    ...profile
}

export default class Profile extends Component {
    static propTypes = {
        avatarUploadRequested: PropTypes.func.isRequired,
        currentUser: PropTypes.object.isRequired,
        error: PropTypes.string
    }

    render() {
        const { avatarUploadRequested, currentUser } = this.props

        return (
            <div className={css.profile}>
                <UserAvatar user={currentUser} />
                <ImageUpload onUpload={avatarUploadRequested} />
            </div>
        )
    }
}

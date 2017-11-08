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
        error: PropTypes.string,
        subscribeToImageUpload: PropTypes.func.isRequired,
        unsubscribeFromImageUpload: PropTypes.func.isRequired
    }

    componentWillMount() {
        this.props.subscribeToImageUpload(this.props.currentUser.id)
    }

    componentWillUnmount() {
        this.props.unsubscribeFromImageUpload()
    }

    render() {
        const {
            avatarUploadRequested,
            currentUser,
            currentUser: { firstName, lastName, email }
        } = this.props

        return (
            <div className={css.profile}>
                <div className={css.avatar}>
                    <UserAvatar user={currentUser} size={'large'} />
                    <ImageUpload onUpload={avatarUploadRequested} />
                </div>
                <div className={css.details}>
                    <div>
                        <h1>{firstName}</h1>
                    </div>
                    <div>
                        <h1>{lastName}</h1>
                    </div>
                    <div>
                        <h1>{email}</h1>
                    </div>
                </div>
            </div>
        )
    }
}

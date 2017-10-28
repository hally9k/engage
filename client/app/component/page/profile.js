import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ImageUpload from 'component/molecule/image-upload.js'

import profile from 'style/page/profile.scss'

const css = {
    ...profile
}

export default class Profile extends Component {
    static propTypes = {
        avatarUploadRequested: PropTypes.func.isRequired,
        error: PropTypes.string
    }

    render() {
        const { avatarUploadRequested } = this.props

        return (
            <div className={css.profile}>
                <ImageUpload onUpload={avatarUploadRequested} />
            </div>
        )
    }
}

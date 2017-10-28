import React, { Component } from 'react'
import PropTypes from 'prop-types'

import button from 'style/atom/button.scss'
import imageUpload from 'style/molecule/image-upload.scss'

const css = {
    ...button,
    ...imageUpload
}

export default class ImageUpload extends Component {
    static propTypes = {
        onUpload: PropTypes.func.isRequired
    }

    handleChange = ({ target }) => {
        const file = target.files[0]

        if (!file) return

        this.props.onUpload(file)
    }

    render() {
        return (
            <div>
                <input
                    className={css['image-upload']}
                    ref={elem => {
                        this.input = elem
                    }}
                    name={'image-upload'}
                    id={'image-upload'}
                    accept="image/*"
                    onChange={this.handleChange}
                    type="file"
                />
                <label className={css.button} htmlFor={'image-upload'}>
                    Upload Image
                </label>
            </div>
        )
    }
}

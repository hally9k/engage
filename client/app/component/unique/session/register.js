import PropTypes from 'prop-types'
import React, { Component } from 'react'

import button from '../../../style/atom/button.scss'
import title from '../../../style/atom/title.scss'
import subTitle from '../../../style/atom/sub-title.scss'
import input from '../../../style/atom/input.scss'
import register from '../../../style/page/register.scss'

const css = {
    ...title,
    ...subTitle,
    ...button,
    ...input,
    ...register
}

export default class Register extends Component {
    static propTypes = {
        register: PropTypes.func.isRequired
    }

    handleRegister = () => {
        this.props.register(
            this.firstName.value,
            this.lastName.value,
            this.email.value,
            this.password.value
        )
    }

    render() {
        return (
            <div className={css.register}>
                <div className={css['register-panel']}>
                    <h1 className={css.title}>Engage</h1>
                    <h4 className={css['sub-title']}>register</h4>
                    <div className={css['input-container']}>
                        <label
                            className={css['input-label']}
                            htmlFor="first-name"
                        >
                            First name
                        </label>
                        <input
                            name="first-name"
                            className={css.input}
                            ref={firstName => (this.firstName = firstName)}
                            required="true"
                        />
                    </div>
                    <br />
                    <div className={css['input-container']}>
                        <label
                            className={css['input-label']}
                            htmlFor="last-name"
                        >
                            Last name
                        </label>
                        <input
                            name="last-name"
                            className={css.input}
                            ref={lastName => (this.lastName = lastName)}
                            required="true"
                        />
                    </div>
                    <br />
                    <div className={css['input-container']}>
                        <label className={css['input-label']} htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            className={css.input}
                            ref={email => (this.email = email)}
                            required="true"
                        />
                    </div>
                    <br />
                    <div className={css['input-container']}>
                        <label
                            className={css['input-label']}
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className={css.input}
                            ref={password => (this.password = password)}
                            required="true"
                        />
                    </div>
                    <br />
                    <div className={css['input-container']}>
                        <label
                            className={css['input-label']}
                            htmlFor="confirm-password"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirm-password"
                            className={css.input}
                            ref={passwordConfirmed =>
                                (this.passwordConfirmed = passwordConfirmed)}
                            required="true"
                        />
                    </div>
                    <br />
                    <button
                        className={css.button}
                        onClick={this.handleRegister}
                    >
                        Register
                    </button>
                </div>
            </div>
        )
    }
}

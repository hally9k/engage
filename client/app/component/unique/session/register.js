import PropTypes from 'prop-types'
import React, { Component } from 'react'

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
            <div className="register">
                <label htmlFor="first-name">
                    First name
                    <input
                        name="first-name"
                        ref={firstName => (this.firstName = firstName)}
                        value="Kirsty"
                        required="true"
                    />
                </label>
                <label htmlFor="last-name">
                    Last name
                    <input
                        name="last-name"
                        ref={lastName => (this.lastName = lastName)}
                        value="Smith Stevens"
                        required="true"
                    />
                </label>
                <label htmlFor="email">
                    Email
                    <input
                        type="email"
                        name="email"
                        ref={email => (this.email = email)}
                        value="k.shrosbree@gmail.com"
                        required="true"
                    />
                </label>
                <label htmlFor="password">
                    Password
                    <input
                        type="password"
                        name="password"
                        ref={password => (this.password = password)}
                        value="password1"
                        required="true"
                    />
                </label>
                <label htmlFor="confirm-password">
                    Confirm Password
                    <input
                        type="password"
                        name="confirm-password"
                        ref={passwordConfirmed =>
                            (this.passwordConfirmed = passwordConfirmed)}
                        value="password1"
                        required="true"
                    />
                </label>
                <button onClick={this.handleRegister}>Register</button>
            </div>
        )
    }
}

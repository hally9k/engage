import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class Root extends Component {
    constructor() {
        super()
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        this.props.fetching()
    }

    render() {
        return (
            <div>
                {JSON.stringify(this.state.users)}
            </div>
        )
    }
}

Root.propTypes = {
    fetching: PropTypes.func.isRequired
}

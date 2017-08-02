import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class Root extends Component {
    componentDidMount() {
        this.props.fetching()
    }

    render() {
        return (
            <div>
                {JSON.stringify(this.props.users)}
            </div>
        )
    }
}

Root.propTypes = {
    fetching: PropTypes.func.isRequired,
    users: PropTypes.object
}

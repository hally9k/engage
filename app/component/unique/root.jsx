import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class Root extends Component {
    componentDidMount() {
        this.props.fetching()
    }

    render() {
        const { user, meta: { fetching } } = this.props

        return (
            <div>
                {(fetching && 'loading...') || JSON.stringify(user)}
            </div>
        )
    }
}

Root.propTypes = {
    fetching: PropTypes.func.isRequired,
    meta: PropTypes.object.isRequired,
    user: PropTypes.object
}

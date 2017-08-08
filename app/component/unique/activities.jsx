import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class Activities extends Component {
    render() {
        return (
            <div>
                {this.props.subjectId}
            </div>
        )
    }
}

Activities.propTypes = {
    subjectId: PropTypes.number.isRequired
}

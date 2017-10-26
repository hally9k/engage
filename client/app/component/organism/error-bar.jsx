import React from 'react'
import PropTypes from 'prop-types'

const Error = ({ error }) => <h1>Error: {error}</h1>

Error.propTypes = {
    error: PropTypes.string
}

export default Error

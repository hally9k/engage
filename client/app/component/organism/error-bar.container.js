import { connect } from 'react-redux'

import { errorSelector } from 'selector/meta'

import ErrorBar from './error-bar'

const mapStateToProps = state => ({
    error: errorSelector(state)
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBar)

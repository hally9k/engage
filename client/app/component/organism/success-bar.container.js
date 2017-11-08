import { connect } from 'react-redux'

import { successSelector } from 'selector/meta'

import SuccessBar from './success-bar'

const mapStateToProps = state => ({
    success: successSelector(state)
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SuccessBar)

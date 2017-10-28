import { connect } from 'react-redux'
import { sendingLoginRequest } from 'duck/meta/session'
import { errorSelector } from 'selector/meta'

import Login from './login'

const mapStateToProps = state => ({
    error: errorSelector(state)
})

const mapDispatchToProps = dispatch => ({
    login: (email, password) => dispatch(sendingLoginRequest(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)

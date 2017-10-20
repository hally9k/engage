import { connect } from 'react-redux'
import { sendingLoginRequest } from 'duck/session'

import Login from './login'

// const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    login: (email, password) => dispatch(sendingLoginRequest(email, password))
})

export default connect(() => ({}), mapDispatchToProps)(Login)

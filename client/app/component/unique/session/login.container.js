import { connect } from 'react-redux'
import { sendingLoginRequest } from 'duck/session'

import Login from './login'

// const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    login: (username, password) =>
        dispatch(sendingLoginRequest(username, password))
})

export default connect(() => ({}), mapDispatchToProps)(Login)

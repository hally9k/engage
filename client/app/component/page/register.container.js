import { connect } from 'react-redux'
import { sendingRegisterRequest } from 'duck/meta/session'

import Register from './register'

// const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    register: (firstName, lastName, email, password) =>
        dispatch(sendingRegisterRequest(firstName, lastName, email, password))
})

export default connect(() => ({}), mapDispatchToProps)(Register)

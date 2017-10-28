import { connect } from 'react-redux'
import { avatarUploadRequested } from 'duck/profile'
import { errorSelector } from 'selector/meta'

import Profile from './profile'

const mapStateToProps = state => ({
    error: errorSelector(state)
})

const mapDispatchToProps = dispatch => ({
    avatarUploadRequested: file => dispatch(avatarUploadRequested(file))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

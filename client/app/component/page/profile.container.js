import { connect } from 'react-redux'
import toJS from 'react-immutable-hoc'
import { withErrorBoundary } from 'react-error-boundary'

import { avatarUploadRequested } from 'duck/meta/profile'
import { errorSelector } from 'selector/meta'
import { currentUserSelector } from 'selector/session'

import Loading from 'component/atom/loading'
import Fallback from 'component/utility/fallback'
import requiredProps from 'component/utility/required-props'

import Profile from './profile'

const mapStateToProps = state => ({
    error: errorSelector(state),
    currentUser: currentUserSelector(state)
})

const mapDispatchToProps = dispatch => ({
    avatarUploadRequested: file => dispatch(avatarUploadRequested(file))
})

export default connect(mapStateToProps, mapDispatchToProps)(
    toJS(withErrorBoundary(requiredProps(Profile, Loading), Fallback))
)

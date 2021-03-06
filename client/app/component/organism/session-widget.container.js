import { connect } from 'react-redux'
import toJS from 'react-immutable-hoc'
import { withErrorBoundary } from 'react-error-boundary'

import { loggingOut } from 'duck/meta/session'
import { fetchingUser } from 'duck/data/user-actions'

import Loading from 'component/atom/loading'
import Fallback from 'component/utility/fallback'
import requiredProps from 'component/utility/required-props'

import sessionSelector, { currentUserSelector } from 'selector/meta/session'

import SessionWidget from './session-widget'

const mapStateToProps = state => ({
    session: sessionSelector(state),
    currentUser: currentUserSelector(state)
})

const mapDispatchToProps = dispatch => ({
    fetchingUser: userId => dispatch(fetchingUser(userId)),
    loggingOut: () => dispatch(loggingOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(
    toJS(withErrorBoundary(requiredProps(SessionWidget, Loading), Fallback))
)

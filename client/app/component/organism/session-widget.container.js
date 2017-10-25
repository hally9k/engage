import { connect } from 'react-redux'
import toJS from 'react-immutable-hoc'
import { withErrorBoundary } from 'react-error-boundary'

import { loggingOut } from 'duck/session'

import Fallback from 'component/utility/fallback'

import sessionSelector, { currentUserSelector } from 'selector/session'

import SessionWidget from './session-widget'

const mapStateToProps = state => ({
    session: sessionSelector(state),
    currentUser: currentUserSelector(state)
})

const mapDispatchToProps = dispatch => ({
    loggingOut: () => dispatch(loggingOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(
    toJS(withErrorBoundary(SessionWidget, Fallback))
)

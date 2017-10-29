import { connect } from 'react-redux'
import toJS from 'react-immutable-hoc'
import { withErrorBoundary } from 'react-error-boundary'

import Loading from 'component/atom/loading'
import Fallback from 'component/utility/fallback'
import requiredProps from 'component/utility/required-props'

import { fetchingUser } from 'duck/data/user'

import { currentUserSelector } from 'selector/meta/session'

import Home from './home'

const mapStateToProps = state => ({
    currentUser: currentUserSelector(state)
})

const mapDispatchToProps = dispatch => ({
    fetchingUser: currentUserId => dispatch(fetchingUser(currentUserId))
})

export default connect(mapStateToProps, mapDispatchToProps)(
    toJS(withErrorBoundary(requiredProps(Home, Loading), Fallback))
)

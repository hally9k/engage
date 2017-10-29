import { connect } from 'react-redux'
import toJS from 'react-immutable-hoc'
import { withErrorBoundary } from 'react-error-boundary'

import Loading from 'component/atom/loading'
import Fallback from 'component/utility/fallback'
import requiredProps from 'component/utility/required-props'

import recentSessionsSelector from 'selector/data/session'

import RecentSessions from './recent-sessions'

const mapStateToProps = (state, { childId, n }) => ({
    recentSessions: recentSessionsSelector(state, childId, n)
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(
    toJS(withErrorBoundary(requiredProps(RecentSessions, Loading), Fallback))
)

import { connect } from 'react-redux'
import toJS from 'react-immutable-hoc'
import { withErrorBoundary } from 'react-error-boundary'

import Loading from 'component/atom/loading'
import Fallback from 'component/utility/fallback'
import requiredProps from 'component/utility/required-props'

import { mostRecentSessionSelector } from 'selector/data/session'

import SessionWidget from './session-widget'

const mapStateToProps = (state, { childId, n }) => ({
    mostRecentSessions: mostRecentSessionSelector(state, childId, n)
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(
    toJS(requiredProps(withErrorBoundary(SessionWidget, Fallback), Loading))
)

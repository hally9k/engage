import { connect } from 'react-redux'
import toJS from 'react-immutable-hoc'
import { withErrorBoundary } from 'react-error-boundary'

import metaSelector from 'selector/meta'
import subjectSelector from 'selector/subject'
import fetchingSelector from 'selector/fetching'

import { fetchingSubject } from 'duck/subject'
import { updateComponentState } from 'duck/meta'

import Loading from 'component/molecule/loading'
import Fallback from 'component/utility/fallback'
import requiredProps from 'component/utility/required-props'

import Activities from './activities'

const mapStateToProps = (state, ownProps) => ({
    fetching: fetchingSelector(state),
    meta: metaSelector(state, 'activities'),
    subject: subjectSelector(state, ownProps.subjectId)
})

const mapDispatchToProps = dispatch => ({
    updateComponentState: value =>
        dispatch(updateComponentState({ key: 'activities', value })),
    fetchingSubject: () => dispatch(fetchingSubject())
})

export default connect(mapStateToProps, mapDispatchToProps)(
    toJS(requiredProps(withErrorBoundary(Activities, Fallback), Loading))
)
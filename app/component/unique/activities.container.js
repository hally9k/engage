import { connect } from 'react-redux'

import { updateComponentState } from 'duck/meta'

import metaSelector from 'selector/meta'
import subjectSelector from 'selector/subject'
import fetchingSelector from 'selector/fetching'
import { fetchingSubject } from 'duck/subject'

import Activities from './activities.jsx'

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

export default connect(mapStateToProps, mapDispatchToProps)(Activities)

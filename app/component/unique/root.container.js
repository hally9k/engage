import { connect } from 'react-redux'

import { fetchingChild } from 'duck/child'
import { fetchingSubject } from 'duck/subject'
import { fetchingUser } from 'duck/user'
import { updateComponentState } from 'duck/meta'

import metaSelector from 'selector/meta'
import childSelector from 'selector/child'
import subjectSelector from 'selector/subject'
import userSelector from 'selector/user'
import fetchingSelector from 'selector/fetching'

import Root from './root'

const mapStateToProps = state => ({
    fetching: fetchingSelector(state),
    meta: metaSelector(state, 'root'),
    child: childSelector(state, metaSelector(state, 'root').childId),
    subject: subjectSelector(state, metaSelector(state, 'root').subjectId),
    user: userSelector(state, metaSelector(state, 'root').userId)
})

const mapDispatchToProps = dispatch => ({
    updateComponentState: value =>
        dispatch(updateComponentState({ key: 'root', value })),
    fetchingChild: () => dispatch(fetchingChild()),
    fetchingSubject: () => dispatch(fetchingSubject()),
    fetchingUser: () => dispatch(fetchingUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Root)

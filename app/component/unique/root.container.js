import { connect } from 'react-redux'
import { fetchingChild } from 'duck/child'
import { fetchingSubject } from 'duck/subject'
import { fetchingUser } from 'duck/user'
import metaSelector from 'selector/meta'
import Root from './root.jsx'
import childSelector from 'selector/child'
import subjectSelector from 'selector/subject'
import userSelector from 'selector/user'

const mapStateToProps = state => ({
    meta: metaSelector(state),
    child: childSelector(state, 1),
    subject: subjectSelector(state, 1),
    user: userSelector(state, 1)
})

const mapDispatchToProps = dispatch => ({
    fetchingChild: () => dispatch(fetchingChild()),
    fetchingSubject: () => dispatch(fetchingSubject()),
    fetchingUser: () => dispatch(fetchingUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Root)

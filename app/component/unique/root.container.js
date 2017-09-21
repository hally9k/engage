import { connect } from 'react-redux'
import toJS from 'react-immutable-hoc'

import { fetchingChild } from 'duck/child'
import { fetchingSubject } from 'duck/subject'
import { fetchingUser } from 'duck/user'
import { updateComponentState } from 'duck/meta'

import metaSelector from 'selector/meta'
import fetchingSelector from 'selector/fetching'

import Root from './root'

const mapStateToProps = state => ({
    fetching: fetchingSelector(state),
    meta: metaSelector(state, 'root'),
})

const mapDispatchToProps = dispatch => ({
    updateComponentState: value =>
        dispatch(updateComponentState({ key: 'root', value })),
    fetchingChild: () => dispatch(fetchingChild()),
    fetchingSubject: () => dispatch(fetchingSubject()),
    fetchingUser: () => dispatch(fetchingUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Root))

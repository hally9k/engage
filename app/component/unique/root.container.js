import { connect } from 'react-redux'

import { fetchingChild } from 'duck/child'
import { fetchingSubject } from 'duck/subject'
import { fetchingUser } from 'duck/user'
import { updateComponentState } from 'duck/meta'

import metaSelector from 'selector/meta'
import fetchingSelector from 'selector/fetching'
import ToJS from 'component/generic/to-js'

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
    fetchingUser: () => dispatch(fetchingUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(ToJS(Root))

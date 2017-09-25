import { connect } from 'react-redux'
import toJS from 'react-immutable-hoc'

import { updateMetaState } from 'duck/meta'

import metaSelector from 'selector/meta'
import fetchingSelector from 'selector/fetching'
import locationSelector from 'selector/location'

import Root from './root'

const mapStateToProps = state => ({
    fetching: fetchingSelector(state),
    meta: metaSelector(state, 'root'),
    location: locationSelector(state),
})

const mapDispatchToProps = dispatch => ({
    updateMetaState: value => dispatch(updateMetaState(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Root))
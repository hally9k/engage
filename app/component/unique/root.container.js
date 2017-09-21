import { connect } from 'react-redux'
import toJS from 'react-immutable-hoc'

import { updateComponentState } from 'duck/meta'

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
    updateComponentState: value =>
        dispatch(updateComponentState({ key: 'root', value })),
})

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Root))

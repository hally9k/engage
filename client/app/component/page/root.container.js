import { connect } from 'react-redux'
import toJS from 'react-immutable-hoc'

import metaSelector from 'selector/meta'
import fetchingSelector from 'selector/fetching'
import locationSelector from 'selector/location'

import Root from './root'

const mapStateToProps = state => ({
    fetching: fetchingSelector(state),
    meta: metaSelector(state, 'root'),
    location: locationSelector(state)
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Root))

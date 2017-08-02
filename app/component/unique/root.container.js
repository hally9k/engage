import { connect } from 'react-redux'
import { fetching } from 'duck'
import metaSelector from 'selector/meta'
import Root from './root.jsx'
import userSelector from 'selector/user'

const mapStateToProps = state => ({
    meta: metaSelector(state),
    user: userSelector(state, 1)
})

const mapDispatchToProps = dispatch => ({
    fetching: () => dispatch(fetching())
})

export default connect(mapStateToProps, mapDispatchToProps)(Root)

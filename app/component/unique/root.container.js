import { connect } from 'react-redux'
import { fetching } from 'duck'
import Root from './root.jsx'
import userSelector from 'selector/user'

function mapStateToProps(state) {
    return {
        users: userSelector(state, 1)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetching: () => dispatch(fetching())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)

import { connect } from 'react-redux'
import { fetching } from 'duck'
import Root from './root.jsx'

// eslint-disable-next-line
function mapStateToProps(state) {
    return {
        data: {}
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetching: () => dispatch(fetching())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)

import { connect } from 'react-redux'
import { fetchingConverstion } from 'duck/conversation'
import { getConversation } from 'selector/conversation'
import Messenger from './messenger'

const mapStateToProps = state => ({
    conversations: getConversation(state),
})

const mapDispatchToProps = dispatch => ({
    fetchingConverstion: channel => dispatch(fetchingConverstion(channel)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Messenger)

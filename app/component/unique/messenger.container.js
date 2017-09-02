import { connect } from 'react-redux'
import { creatingConversation, fetchingConversation } from 'duck/conversation'
import conversationSelector from 'selector/conversation'
import { currentUserIdSelector } from 'selector/meta'

import Messenger from './messenger'

const mapStateToProps = state => ({
    conversations: conversationSelector(state),
    currentUserId: currentUserIdSelector(state),
})

const mapDispatchToProps = dispatch => ({
    creatingConversation: (userId, channel) =>
        dispatch(creatingConversation(userId, channel)),
    fetchingConversation: userId => dispatch(fetchingConversation(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Messenger)

import { connect } from 'react-redux'

import conversationSelector from 'selector/conversation'
import { currentUserIdSelector } from 'selector/meta'
import {
    fetchingConversation,
    sendingNewMessage,
    subscribeToConversation,
    unsubscribeFromConversation,
} from 'duck/conversation'

import Conversation from './conversation'

const mapStateToProps = state => ({
    conversation: conversationSelector(state),
    currentUserId: currentUserIdSelector(state),
})

const mapDispatchToProps = dispatch => ({
    fetchingConversation: () => dispatch(fetchingConversation()),
    sendingNewMessage: (message, userId) =>
        dispatch(sendingNewMessage(message, userId)),
    subscribeToConversation: () => dispatch(subscribeToConversation()),
    unsubscribeFromConversation: () => dispatch(unsubscribeFromConversation()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Conversation)

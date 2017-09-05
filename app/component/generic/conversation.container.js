import { connect } from 'react-redux'

import { currentUserIdSelector } from 'selector/meta'
import {
    fetchingConversation,
    subscribeToConversation,
    unsubscribeFromConversation,
} from 'duck/conversation'

import { sendingNewMessage } from 'duck/message'

import Conversation from './conversation'

const mapStateToProps = state => ({
    currentUserId: currentUserIdSelector(state),
})

const mapDispatchToProps = dispatch => ({
    fetchingConversation: userId => dispatch(fetchingConversation(userId)),
    sendingNewMessage: (content, userId, conversationId, channel) =>
        dispatch(sendingNewMessage(content, userId, conversationId, channel)),
    subscribeToConversation: channel =>
        dispatch(subscribeToConversation(channel)),
    unsubscribeFromConversation: () => dispatch(unsubscribeFromConversation()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Conversation)

import { connect } from 'react-redux'

import { currentUserIdSelector } from 'selector/meta'
import {
    fetchingConversation,
    sendingNewMessage,
    subscribeToConversation,
    unsubscribeFromConversation,
} from 'duck/conversation'

import Conversation from './conversation'

const mapStateToProps = state => ({
    currentUserId: currentUserIdSelector(state),
})

const mapDispatchToProps = dispatch => ({
    fetchingConversation: userId => dispatch(fetchingConversation(userId)),
    sendingNewMessage: (message, userId) =>
        dispatch(sendingNewMessage(message, userId)),
    subscribeToConversation: () => dispatch(subscribeToConversation()),
    unsubscribeFromConversation: () => dispatch(unsubscribeFromConversation()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Conversation)

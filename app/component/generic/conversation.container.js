import { connect } from 'react-redux'
import toJS from 'react-immutable-hoc'

import { currentUserIdSelector } from 'selector/meta'
import { sendingNewMessage } from 'duck/message'
import {
    fetchingConversation,
    subscribeToConversation,
    unsubscribeFromConversation,
} from 'duck/conversation'
import Loading from 'component/generic/loading'
import RequiredProps from 'component/generic/required-props'

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

export default connect(mapStateToProps, mapDispatchToProps)(
    toJS(RequiredProps(Conversation, Loading)),
)

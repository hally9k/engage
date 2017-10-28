import { connect } from 'react-redux'
import toJS from 'react-immutable-hoc'

import { currentUserIdSelector } from 'selector/meta'

import { sendingNewMessage } from 'duck/data/message'
import {
    subscribeToConversation,
    unsubscribeFromConversation
} from 'duck/data/conversation'

import Loading from 'component/molecule/loading'
import RequiredProps from 'component/utility/required-props'

import Conversation from './conversation'

const mapStateToProps = (state, { conversation }) => ({
    currentUserId: currentUserIdSelector(state),
    conversation
})

const mapDispatchToProps = dispatch => ({
    sendingNewMessage: (content, userId, conversationId, channel) =>
        dispatch(sendingNewMessage(content, userId, conversationId, channel)),
    subscribeToConversation: channel =>
        dispatch(subscribeToConversation(channel)),
    unsubscribeFromConversation: channel =>
        dispatch(unsubscribeFromConversation(channel))
})

export default connect(mapStateToProps, mapDispatchToProps)(
    toJS(RequiredProps(Conversation, Loading))
)

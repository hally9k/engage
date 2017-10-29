import { connect } from 'react-redux'
import toJS from 'react-immutable-hoc'

import {
    creatingConversation,
    fetchingConversation
} from 'duck/data/conversation'

import {
    conversationSelector,
    selectedConversationSelector
} from 'selector/data/conversation'
import { currentUserIdSelector } from 'selector/meta'
import Loading from 'component/atom/loading'
import RequiredProps from 'component/utility/required-props'

import Messenger from './messenger'

const mapStateToProps = state => ({
    conversations: conversationSelector(state),
    currentUserId: currentUserIdSelector(state),
    selectedConversation: selectedConversationSelector(state)
})

const mapDispatchToProps = dispatch => ({
    creatingConversation: (userId, channel) =>
        dispatch(creatingConversation(userId, channel)),
    fetchingConversation: userId => dispatch(fetchingConversation(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(
    toJS(RequiredProps(Messenger, Loading))
)

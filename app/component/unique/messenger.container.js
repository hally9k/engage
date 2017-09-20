import { connect } from 'react-redux'
import { creatingConversation, fetchingConversation } from 'duck/conversation'
import conversationSelector from 'selector/conversation'
import { currentUserIdSelector } from 'selector/meta'
import Loading from 'component/generic/loading'
import RequiredProps from 'component/generic/required-props'
import ToJS from 'component/generic/to-js'

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

export default connect(mapStateToProps, mapDispatchToProps)(
    ToJS(
        RequiredProps(Messenger, Loading)
    )
)

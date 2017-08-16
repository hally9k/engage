import { connect } from 'react-redux'

import commentSelector from 'selector/comment'
import { currentUserIdSelector } from 'selector/meta'
import {
    fetchingCommentHistory,
    sendingNewComment,
    subscribeToNewComments,
    unsubscribeFromNewComments,
} from 'duck/comment'

import Comments from './comments'

const mapStateToProps = state => ({
    comments: commentSelector(state),
    currentUserId: currentUserIdSelector(state),
})

const mapDispatchToProps = dispatch => ({
    fetchingCommentHistory: () => dispatch(fetchingCommentHistory()),
    sendingNewComment: (message, userId) =>
        dispatch(sendingNewComment(message, userId)),
    subscribeToNewComments: () => dispatch(subscribeToNewComments()),
    unsubscribeFromNewComments: () => dispatch(unsubscribeFromNewComments()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Comments)

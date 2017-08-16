import graphql from 'utility/graphql'
import { normalize } from 'normalizr'
import { processed, PROCESSED } from 'duck'
import { commentSchema } from 'schema'
import commentQuery from 'graphql/query/comment'
import commentMutation from 'graphql/mutation/comment'
import newCommentSubscription from 'graphql/subscription/new-comment'
import { fromJS, Map } from 'immutable'
import { subscribe, unsubscribe } from 'redux-graphql-subscriptions'

// Actions
const FETCHING_COMMENT_HISTORY = 'comment/FETCHING_COMMENT_HISTORY'
const RECEIVED_COMMENT_HISTORY = 'comment/RECEIVED_COMMENT_HISTORY'
const SENDING_NEW_COMMENT = 'comment/SENDING_NEW_COMMENT'
const RECEIVED_NEW_COMMENT = 'comment/RECEIVED_NEW_COMMENT'
const RECEIVED_NEW_COMMENT_WITH_ERRORS =
    'comment/RECEIVED_NEW_COMMENT_WITH_ERRORS'

export const fetchingCommentHistory = payload => ({
    type: FETCHING_COMMENT_HISTORY,
    payload,
})

export const receivedCommentHistory = payload => ({
    type: RECEIVED_COMMENT_HISTORY,
    payload,
})

export const sendingNewComment = (message, userId) => ({
    type: SENDING_NEW_COMMENT,
    payload: {
        message,
        userId,
    },
})

export const receivedNewComment = payload => ({
    type: RECEIVED_NEW_COMMENT,
    payload,
})

export const receivedNewCommentWithErrors = payload => ({
    type: RECEIVED_NEW_COMMENT_WITH_ERRORS,
    payload,
})

export const subscribeToNewComments = () => subscribe(newComment)

export const unsubscribeFromNewComments = () => unsubscribe(newComment.id)

// Subscriptions
const newComment = {
    id: 'newComment',
    query: newCommentSubscription,
    success: receivedNewComment,
    failure: receivedNewCommentWithErrors,
}

// Reducers
const INITIAL_STATE = Map()

export default (state = INITIAL_STATE, action) => {
    if (!action) return state
    switch (action.type) {
        case PROCESSED:
            return state.merge(fromJS(action.payload.entities.comment))
        default:
            return state
    }
}

// Epics
export const fetchingCommentHistoryEpic = action$ =>
    action$
        .ofType(FETCHING_COMMENT_HISTORY)
        .mergeMap(({ payload: id }) =>
            graphql
                .request(commentQuery, { id })
                .then(commentHistory => [
                    receivedCommentHistory(commentHistory),
                ]),
        )

export const receivedCommentHistoryEpic = action$ =>
    action$
        .ofType(RECEIVED_COMMENT_HISTORY)
        .mergeMap(({ payload: { comment: commentHistory } }) => [
            processed(normalize(commentHistory, [commentSchema])),
        ])

export const sendingNewCommentEpic = action$ =>
    action$
        .ofType(SENDING_NEW_COMMENT)
        .mergeMap(({ payload: { message, userId } }) =>
            graphql
                .request(commentMutation, { message, userId })
                .then(({ comment }) => [receivedNewComment(comment)]),
        )

export const receivedNewCommentEpic = action$ =>
    action$
        .ofType(RECEIVED_NEW_COMMENT)
        .mergeMap(({ payload: comment }) => [
            processed(normalize(comment, commentSchema)),
        ])

export const epics = {
    fetchingCommentHistoryEpic,
    receivedCommentHistoryEpic,
    sendingNewCommentEpic,
    receivedNewCommentEpic,
}

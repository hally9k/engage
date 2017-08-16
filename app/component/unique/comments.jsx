import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ago } from 'utility/time'

const ONE_THOUSAND = 1000

export default class Comments extends Component {
    componentWillMount() {
        this.props.subscribeToNewComments()
        this.props.fetchingCommentHistory()
    }

    componentWillUnMount() {
        this.props.unsubscribeFromNewComments()
    }

    handleSendingNewComment = () =>
        this.props.sendingNewComment(this.input.value, this.props.currentUserId)

    renderCommentInput = () =>
        <div>
            {this.renderComments()}
            <input
                ref={input => (this.input = input)}
                className="comment-input"
            />
            <button onClick={this.handleSendingNewComment}>Send</button>
        </div>

    renderComments = () =>
        <div className="comments">
            {this.props.comments.map((comment, index) =>
                <div key={`comment-${index}`} className="comment">
                    <h5>
                        {comment.user.firstName}
                    </h5>
                    <p>
                        {comment.message}
                    </p>
                    <p className="time-stamp">
                        {ago(parseFloat(comment.createdAt) * ONE_THOUSAND)}
                    </p>
                </div>,
            )}
        </div>

    render() {
        const { comments } = this.props

        return comments ? this.renderCommentInput() : null
    }
}

Comments.propTypes = {
    comments: PropTypes.array,
    currentUserId: PropTypes.number.isRequired,
    fetchingCommentHistory: PropTypes.func.isRequired,
    sendingNewComment: PropTypes.func.isRequired,
    subscribeToNewComments: PropTypes.func.isRequired,
    unsubscribeFromNewComments: PropTypes.func.isRequired,
}

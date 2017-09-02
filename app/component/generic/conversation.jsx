import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ago } from 'utility/time'

const ONE_THOUSAND = 1000

export default class Comments extends Component {
    componentWillMount() {
        this.props.subscribeToConversation()
        this.props.fetchingConversation()
    }

    componentWillUnMount() {
        this.props.unsubscribeFromConversation()
    }

    handleSendingNewMessage = () =>
        this.props.sendingNewMessage(this.input.value, this.props.currentUserId)

    renderMessageInput = () =>
        <div>
            {this.renderConversation()}
            <input
                ref={input => (this.input = input)}
                className="comment-input"
            />
            <button onClick={this.handleSendingNewComment}>Send</button>
        </div>

    renderConversation = () =>
        <div className="conversation">
            {this.props.conversation.messages.map((message, index) =>
                <div key={`comment-${index}`} className="comment">
                    <h5>
                        {message.user.firstName}
                    </h5>
                    <p>
                        {message.message}
                    </p>
                    <p className="time-stamp">
                        {ago(parseFloat(message.createdAt) * ONE_THOUSAND)}
                    </p>
                </div>,
            )}
        </div>

    render() {
        const { conversation } = this.props

        return conversation ? this.renderMessageInput() : null
    }
}

Comments.propTypes = {
    conversation: PropTypes.object,
    currentUserId: PropTypes.number.isRequired,
    fetchingConversation: PropTypes.func.isRequired,
    sendingNewMessage: PropTypes.func.isRequired,
    subscribeToConversation: PropTypes.func.isRequired,
    unsubscribeFromConversation: PropTypes.func.isRequired,
}

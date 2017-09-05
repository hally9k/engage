import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { ago } from 'utility/time'

const ONE_THOUSAND = 1000

export default class Comments extends Component {
    componentWillMount = () => {
        const { conversation: { channel }, currentUserId } = this.props

        this.props.subscribeToConversation(channel)
        this.props.fetchingConversation(currentUserId)
    }

    componentWillUnMount = () => this.props.unsubscribeFromConversation()

    handleSendingNewMessage = () => {
        const {
            conversation: { id: conversationId, channel },
            currentUserId,
        } = this.props

        this.props.sendingNewMessage(
            this.input.value,
            currentUserId,
            conversationId,
            channel,
        )
    }

    renderMessageInput = () =>
        <div>
            <input
                ref={input => (this.input = input)}
                className="comment-input"
            />
            <button onClick={this.handleSendingNewMessage}>Send</button>
        </div>

    renderMessages = () =>
        this.props.conversation.messages.map((message, index) =>
            <div key={`message-${index}`} className="message">
                <h5>
                    {message.user.firstName}
                </h5>
                <p>
                    {message.content}
                </p>
                <p className="time-stamp">
                    {ago(parseFloat(message.createdAt) * ONE_THOUSAND)}
                </p>
            </div>,
        )

    renderConversation = channel =>
        <div className="conversation">
            <h2>
                {channel}
            </h2>
            {this.props.conversation.messages && this.renderMessages()}
            {this.renderMessageInput()}
        </div>

    render() {
        const { conversation } = this.props

        return conversation
            ? this.renderConversation(conversation.channel)
            : null
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

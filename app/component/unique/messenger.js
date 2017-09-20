import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Conversation from 'component/generic/conversation.container'

export default class Messenger extends Component {
    componentWillMount = () => {
        const { fetchingConversation, currentUserId } = this.props

        fetchingConversation(currentUserId)
    }

    handleCreateConversation = () => {
        const { creatingConversation, currentUserId } = this.props

        creatingConversation(currentUserId, this.channelInput.value)
    }

    render() {
        const { conversations } = this.props

        return (
            <div className="messenger">
                <label htmlFor="channel-input">
                    channel:
                    <input
                        name="channel-input"
                        ref={input => (this.channelInput = input)}
                    />
                    <button onClick={this.handleCreateConversation}>
                        Create Channel
                    </button>
                    {conversations &&
                        conversations.map(conversation =>
                            <Conversation
                                key={`conversation-${conversation.id}`}
                                conversation={conversation}
                            />,
                        )}
                </label>
            </div>
        )
    }
}

Messenger.propTypes = {
    conversations: PropTypes.array,
    creatingConversation: PropTypes.func.isRequired,
    currentUserId: PropTypes.number.isRequired,
    fetchingConversation: PropTypes.func.isRequired,
}

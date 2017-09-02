import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Conversation from 'component/generic/conversation.container'

export default class Messenger extends Component {
    handleCreateConversation() {
        const { fetchingConverstion } = this.props

        fetchingConverstion(this.channelInput.value)
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
                    {conversations.map(conversation =>
                        <Conversation
                            key={conversation.id}
                            conversation={conversation}
                        />,
                    )}
                </label>
            </div>
        )
    }
}

Messenger.propTypes = {
    conversations: PropTypes.object,
    fetchingConverstion: PropTypes.func.isRequired,
}

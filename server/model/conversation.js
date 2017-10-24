// @flow
import sql from '../connector/sql'
import slug from 'slug'

export default {
    one(conversationId: Number) {
        return sql
            .select()
            .from('conversation')
            .where('id', conversationId)
            .then(conversation => conversation)
    },
    all(userId: Number) {
        if (userId) {
            return sql
                .select()
                .from('user_conversation')
                .where('user_id', userId)
                .innerJoin('conversation', 'id', 'conversation_id')
                .then(conversations => conversations)
        }

        return sql
            .select()
            .from('user_conversation')
            .innerJoin('conversation', 'id', 'conversation_id')
            .then(conversations => conversations)
    },
    add(userId: Number, channel: String) {
        return sql
            .select()
            .from('conversation')
            .where('channel', channel)
            .first()
            .then(conversation => {
                if (conversation) {
                    return this.addUser(userId, conversation.id)
                }

                return sql('conversation')
                    .insert({ channel, slug: slug(channel, { lower: true }) })
                    .returning('id')
                    .then(([conversationId]) => {
                        return this.addUser(userId, conversationId).then(x => {
                            return x
                        })
                    })
            })
    },
    addUser(userId: Number, conversationId: Number) {
        return sql('user_conversation')
            .insert({
                conversation_id: conversationId,
                user_id: userId,
            })
            .returning('conversation_id')
            .then(([conversationId]) => {
                return this.one(conversationId)
            })
    },
    allUsers(conversationId: Number) {
        return sql('conversation_user')
            .where('conversation_id', conversationId)
            .innerJoin('user', 'id', 'user_id')
            .then(users => {
                return users
            })
    },
}

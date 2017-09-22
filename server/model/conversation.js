// @flow
import slug from 'slug'
export default class Conversation {
    sql: Knex$Knex
    redis: RedisConnector

    constructor(sql: Knex$Knex) {
        this.sql = sql
    }

    one(conversationId: Number) {
        return this.sql
            .select()
            .from('conversation')
            .where('id', conversationId)
            .then(conversation => conversation)
    }

    all(userId: Number) {
        return this.sql
            .select()
            .from('user_conversation')
            .where('user_id', userId)
            .innerJoin('conversation', 'id', 'conversation_id')
            .then(conversations => conversations)
    }

    add(userId: Number, channel: String) {
        return this.sql
            .select()
            .from('conversation')
            .where('channel', channel)
            .first()
            .then(conversation => {
                if (conversation) {
                    return this.addUser(userId, conversation.id)
                }

                return this.sql('conversation')
                    .insert({ channel, slug: slug(channel, { lower: true }) })
                    .returning('id')
                    .then(conversationId => {
                        return this.addUser(
                            userId,
                            conversationId[0],
                        ).then(x => {
                            return x
                        })
                    })
            })
    }

    addUser(userId: Number, conversationId: Number) {
        return this.sql('user_conversation')
            .insert({
                conversation_id: conversationId,
                user_id: userId,
            })
            .returning('conversation_id')
            .then(conversationId => {
                return this.one(conversationId[0])
            })
    }

    allUsers(conversationId: Number) {
        return this.sql('conversation_user')
            .where('conversation_id', conversationId)
            .innerJoin('user', 'id', 'user_id')
            .then(users => {
                return users
            })
    }
}

// @flow
import { pubsub } from '../schema'
export default class Conversation {
    sql: Knex$Knex
    redis: RedisConnector

    constructor(sql: Knex$Knex, redis: RedisConnector) {
        this.sql = sql
        this.redis = redis

        this.redis.sub.on('message', function(channel, message) {
            pubsub.publish(channel, {
                conversation: JSON.parse(message),
            })
        })
    }

    add(userId: Number, channel: String) {
        this.redis.sub.subscribe(channel)

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
                    .insert({ channel })
                    .returning('id')
                    .then(conversationId =>
                        this.addUser(userId, conversationId[0]),
                    )
            })
    }

    addUser(userId: Number, conversationId: Number) {
        return this.sql('conversation_user').insert({
            conversation_id: conversationId,
            user_id: userId,
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

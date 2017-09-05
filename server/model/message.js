// @flow
export default class Message {
    sql: Knex$Knex
    redis: RedisConnector

    constructor(sql: Knex$Knex, redis: RedisConnector) {
        this.sql = sql
        this.redis = redis
    }

    all(conversationId: Number) {
        return this.sql
            .select()
            .from('message')
            .where('conversation_id', conversationId)
            .orderBy('created_at', 'asc')
            .then(messages => messages)
    }

    add(
        content: String,
        userId: Number,
        conversationId: Number,
        channel: String,
    ) {
        return this.sql('message')
            .insert({
                content,
                user_id: userId,
                conversation_id: conversationId,
            })
            .returning('id')
            .then(messageId => {
                return this.sql
                    .select()
                    .from('message')
                    .where('id', messageId[0])
                    .first()
                    .then(message => {
                        this.redis.pub.publish(channel, JSON.stringify(message))

                        return message
                    })
            })
    }
}

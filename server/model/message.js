// @flow
export default class Message {
    sql: Knex$Knex
    redis: RedisConnector

    constructor(sql: Knex$Knex, redis: RedisConnector) {
        this.sql = sql
        this.redis = redis
    }

    add(
        userId: Number,
        conversationId: Number,
        channel: String,
        message: String,
    ) {
        return this.sql('message')
            .insert({
                message,
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

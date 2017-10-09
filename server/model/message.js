// @flow
import sql from '../connector/sql'
import redis from '../connector/redis'

export default {
    one(id: Number) {
        return sql
            .select()
            .from('message')
            .where('id', id)
            .first()
            .then(message => message)
    },
    all(conversationId: Number) {
        return sql
            .select()
            .from('message')
            .where('conversation_id', conversationId)
            .orderBy('created_at', 'asc')
            .then(messages => messages)
    },
    add(
        content: String,
        userId: Number,
        conversationId: Number,
        channel: String,
    ) {
        return sql('message')
            .insert({
                content,
                user_id: userId,
                conversation_id: conversationId,
            })
            .returning('id')
            .then((messageId: Array<Number>) => {
                return sql
                    .select()
                    .from('message')
                    .where('id', messageId[0])
                    .first()
                    .then(message => {
                        redis.pub.publish(channel, JSON.stringify(message))

                        return message
                    })
            })
    },
}

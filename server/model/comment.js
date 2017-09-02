// @flow
import { pubsub } from '../schema'
class Comment {
    sql: Knex$Knex
    redis: RedisConnector

    constructor(sql: Knex$Knex, redis: RedisConnector) {
        this.sql = sql
        this.redis = redis

        this.redis.sub.on('message', function(channel, comment) {
            pubsub.publish(channel, {
                newComment: JSON.parse(comment),
            })
        })

        this.redis.sub.subscribe('newComment')
    }

    channel(channel: String) {
        return this.sql
            .select()
            .from('comment')
            .where('channel', channel)
            .orderBy('created_at', 'asc')
            .then(comments => {
                return comments
            })
    }

    add(userId: Number, message: String) {
        return this.sql('comment')
            .insert({ message, user_id: userId, channel: 'one' })
            .returning('id')
            .then(commentId => {
                return this.sql
                    .select()
                    .from('comment')
                    .where('id', commentId[0])
                    .first()
                    .then(comment => {
                        this.redis.pub.publish(
                            'newComment',
                            JSON.stringify(comment),
                        )

                        return comment
                    })
            })
    }
}

export default Comment

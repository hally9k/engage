// @flow
import { pubsub } from '../schema'
class Comment {
    sql: Knex$Knex

    constructor(sql: Knex$Knex) {
        this.sql = sql
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
                        pubsub.publish('newComment', {
                            newComment: comment,
                        })

                        return comment
                    })
            })
    }
}

export default Comment

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
            .then(comments => {
                return comments
            })
    }

    add(userId: Number, message: String) {
        return this.sql('comment')
            .insert({ message, user_id: userId, channel: 'one' })
            .then(() => {
                return this.sql
                    .select()
                    .from('comment')
                    .where('channel', 'one')
                    .first()
                    .then(comment => {
                        pubsub.publish(
                            'newComment',
                            {
                                newComment: comment
                            },
                            { user: { five: 'five' } }
                        )

                        return comment
                    })
            })
    }
}

export default Comment

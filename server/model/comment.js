// @flow
import { pubsub } from '../schema'
class Comment {
    sql: Knex$Knex

    constructor(sql: Knex$Knex) {
        this.sql = sql
    }

    add(userId: Number, message: String) {
        pubsub.publish('newComment', { userId, message })

        this.sql('comment')
            .insert({ message, user_id: userId })
            .then(comment => comment)

        return { userId, message }
    }
}

export default Comment

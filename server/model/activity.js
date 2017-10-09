// @flow
import sql from '../connector/sql'

export default {
    one(id: Number) {
        return sql
            .select()
            .from('activity')
            .where('id', id)
            .first()
            .then(activity => activity)
    },

    all() {
        return sql
            .select()
            .from('activity')
            .then(activities => activities)
    },

    oneOrAll(id: Number) {
        return id ? [this.one(id)] : this.all()
    },
}

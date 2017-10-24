// @flow
import sql from '../connector/sql'

export default {
    one(id: Number) {
        return sql
            .select()
            .from('user')
            .where('id', id)
            .first()
            .then(user => {
                return user
            })
    },
    all() {
        return sql
            .select()
            .from('user')
            .then(users => users)
    },
    oneOrAll(id: Number) {
        return id ? [this.one(id)] : this.all()
    },
    children(id: Number) {
        return sql
            .select()
            .from('user_child')
            .innerJoin('child', 'id', 'child_id')
            .where('user_id', id)
            .then(child => child)
    },
}

// @flow
import sql from '../connector/sql'

export default {
    one(id: Number) {
        return sql
            .select()
            .from('session')
            .where('id', id)
            .first()
            .then(session => session)
    },
    all() {
        return sql
            .select()
            .from('session')
            .then(sessions => sessions)
    },
    oneOrAll(id: Number) {
        return id ? [this.one(id)] : this.all()
    },
}

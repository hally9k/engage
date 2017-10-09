// @flow
import sql from '../connector/sql'

export default {
    one(id: Number) {
        return sql
            .select()
            .from('subject')
            .where('id', id)
            .first()
            .then(subject => subject)
    },
    all() {
        return sql
            .select()
            .from('subject')
            .then(subjects => subjects)
    },
    oneOrAll(id: Number) {
        return id ? [this.one(id)] : this.all()
    },
    activities(id: Number) {
        return sql
            .select()
            .from('activity')
            .where('subject_id', id)
            .then(subject => subject)
    },
}

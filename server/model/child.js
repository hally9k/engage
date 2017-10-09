// @flow
import sql from '../connector/sql'

export default {
    one(id: Number) {
        return sql
            .select()
            .from('child')
            .where('id', id)
            .first()
            .then(child => child)
    },
    all() {
        return sql
            .select()
            .from('child')
            .then(children => children)
    },
    oneOrAll(id: Number) {
        return id ? [this.one(id)] : this.all()
    },
    subjects(id: Number) {
        return sql
            .select()
            .from('child_subject')
            .innerJoin('subject', 'child_id', 'id')
            .where('child_id', id)
            .then(subjects => subjects)
    },
}

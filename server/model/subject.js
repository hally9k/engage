// @flow

class Subject {
    sql: Knex$QueryBuilder<Subject>

    constructor(sql: Knex$QueryBuilder<Subject>) {
        this.sql = sql
    }

    one(id: Number) {
        return this.sql
            .select()
            .from('subject')
            .where('id', id)
            .first()
            .then(subject => subject)
    }

    all() {
        return this.sql
            .select()
            .from('subject')
            .then(subjects => subjects)
    }

    oneOrAll(id: Number) {
        return id ? [this.one(id)] : this.all()
    }

    activities(id: Number) {
        return this.sql
            .select()
            .from('activity')
            .where('subject_id', id)
            .then(subject => subject)
    }
}

export default Subject

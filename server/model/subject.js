// @flow

class Subject {
    sql: Knex$QueryBuilder

    constructor(sql: Knex$QueryBuilder) {
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
        return this.sql.select().from('subject').then(subjects => subjects)
    }

    oneOrAll(id: Number) {
        return id ? [this.one(id)] : this.all()
    }
}

export default Subject
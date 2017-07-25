// @flow

class Session {
    sql: Knex$QueryBuilder

    constructor(sql: Knex$QueryBuilder) {
        this.sql = sql
    }

    one(id: Number) {
        return this.sql
            .select()
            .from('session')
            .where('id', id)
            .first()
            .then(session => session)
    }

    all() {
        return this.sql.select().from('session').then(sessions => sessions)
    }

    oneOrAll(id: Number) {
        return id ? [this.one(id)] : this.all()
    }
}

export default Session

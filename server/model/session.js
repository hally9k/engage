class Session {
    constructor(sql) {
        this.sql = sql
    }

    one(id) {
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

    oneOrAll(id) {
        return id ? [this.one(id)] : this.all()
    }
}

export default Session

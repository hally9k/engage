class Subject {
    constructor(sql) {
        this.sql = sql
    }

    one(id) {
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

    oneOrAll(id) {
        return id ? [this.one(id)] : this.all()
    }
}

module.exports = Subject

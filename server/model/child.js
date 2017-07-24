class Child {
    constructor(sql) {
        this.sql = sql
    }

    one(id) {
        return this.sql
            .select()
            .from('child')
            .where('id', id)
            .first()
            .then(child => child)
    }

    all() {
        return this.sql.select().from('child').then(children => children)
    }

    oneOrAll(id) {
        return id ? [this.one(id)] : this.all()
    }

    subjects(id) {
        return this.sql
            .select()
            .from('child_subject')
            .innerJoin('subject', 'child_id', 'id')
            .where('child_id', id)
            .then(subjects => subjects)
    }
}

export default Child

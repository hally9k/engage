export default {
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '',
        database: 'engage'
    },
    migrations: {
        directory: './migrations'
    },
    seeds: {
        directory: './seeds'
    }
}

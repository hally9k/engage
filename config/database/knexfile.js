module.exports = {
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: '',
        database: 'engage',
        multipleStatements: true, // TODO: Make this only in local and stagong
    },
    migrations: {
        directory: './migrations',
    },
    seeds: {
        directory: './seeds',
    },
}

const DEFAULT_PORT = 5432

export default {
    client: 'pg',
    connection: {
        host: process.env.PG_HOST || 'localhost',
        port: process.env.PG_PORT || DEFAULT_PORT,
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

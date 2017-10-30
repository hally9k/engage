const env = process.env.NODE_ENV || 'development'

export default {
    local: {
        service: {
            redis: {
                host: 'localhost',
                port: 6379,
            },
            postgres: {
                host: 'localhost',
                port: 5432,
            },
        },
    },
    development: {
        service: {
            redis: {
                host: 'redis',
                port: 6379,
            },
            postgres: {
                host: 'db',
                port: 5432,
            },
        },
    },
    staging: {
        service: {
            redis: {
                host: 'redis',
                port: 6379,
            },
            postgres: {
                host: 'db',
                port: 5432,
            },
        },
    },
    production: {
      service: {
          redis: {
              host: 'redis',
              port: 6379,
          },
          postgres: {
              host: 'db',
              port: 5432,
          },
      },
    },
}[env]

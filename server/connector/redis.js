import redis from 'redis'

export default {
    sub: redis.createClient({ host: 'redis', port: 9977 }),
    pub: redis.createClient({ host: 'redis', port: 9977 }),
}

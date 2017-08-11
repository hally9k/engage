import redis from 'redis'

export default {
    sub: redis.createClient(),
    pub: redis.createClient(),
}

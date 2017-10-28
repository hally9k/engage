import { env } from './index'

export default {
    development: 'http://localhost:8083',
    production: 'http://engage.smith-stevens.com:8083'
}[env]

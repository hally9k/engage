import { env } from './index'

export const LOCAL_STORAGE_SESSION_KEY = 'engage:session'

export default {
    development: 'http://localhost:8082',
    production: 'http://engage.smith-stevens.com:8082'
}[env]

export const roles = { USER: 'USER', ADMIN: 'ADMIN' }

import { env } from './index'

export default {
    development: 'http://localhost:8082',
    production: 'https://auth.engage'
}[env]

export const roles = { USER: 'USER', ADMIN: 'ADMIN' }

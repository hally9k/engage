import express from 'express'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import sql from './connector/sql'
import passport from 'passport'
import passportJWT from 'passport-jwt'
import bcrypt from 'bcryptjs'

const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const DEFAULT_PORT = 8082
const PORT = process.env.PORT || DEFAULT_PORT

const UNAUTHORIZED = 401
const BAD_REQUEST = 400

const SALT_ROUNDS = 10

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: 'tasmanianDevil',
}

const strategy = new JwtStrategy(jwtOptions, ({ id }, next) => {
    return sql
        .select()
        .from('user')
        .where('id', id)
        .first()
        .then(user => (user ? next(null, user) : next(null, false)))
})

passport.use(strategy)

const app = express()

app.use(passport.initialize())

app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
)

app.use(bodyParser.json())

app.get('/', (req, res) => res.json({ message: 'JWT Server Running...' }))

app.post('/register', (req, res) => {
    if (!req.body)
        res.status(BAD_REQUEST).json({ message: 'credentials required' })
    const { email, password, firstName, lastName } = req.body

    bcrypt.genSalt(SALT_ROUNDS, (err, salt) =>
        bcrypt.hash(password, salt, (err, hash) =>
            sql('user')
                .insert({
                    email,
                    password: hash,
                    first_name: firstName,
                    last_name: lastName,
                })
                .returning('id')
                .then(() => res.json({ message: 'user created' })),
        ),
    )
})

app.post('/login', (req, res) => {
    if (!req.body)
        res.status(BAD_REQUEST).json({ message: 'credentials required' })
    const { email, password } = req.body

    return sql
        .select()
        .from('user')
        .where('email', email)
        .first()
        .then(user => {
            if (!user)
                res.status(UNAUTHORIZED).json({ message: 'no such user found' })

            if (user.password === password) {
                const { id, roles } = user
                const token = jwt.sign({ id, roles }, jwtOptions.secretOrKey)

                res.json({ message: 'ok', token: token })
            } else {
                res
                    .status(UNAUTHORIZED)
                    .json({ message: 'passwords did not match' })
            }
        })
})

app.get(
    '/secret-admin',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const token = req.headers.authorization.split(' ')[1]
        const { id } = jwt.verify(token, jwtOptions.secretOrKey)

        return sql
            .select()
            .from('user')
            .where('user.id', id)
            .join('user_role', 'user_id', 'user.id')
            .join('role', 'role.id', 'role_id')
            .then(users => {
                if (users.map(user => user.role).includes('ADMIN')) {
                    res.json({
                        message:
                            'Success! You can not see this without a token',
                    })
                } else {
                    res.status(UNAUTHORIZED).json({
                        message:
                            'Access denied! You do not have the required permissions.',
                    })
                }
            })
    },
)

app.get(
    '/secret-user',
    passport.authenticate('jwt', { session: false }),
    function(req, res) {
        const token = req.headers.authorization.split(' ')[1]
        const { id } = jwt.verify(token, jwtOptions.secretOrKey)

        return sql
            .select()
            .from('user')
            .where('user.id', id)
            .join('user_role', 'user_id', 'user.id')
            .join('role', 'role.id', 'role_id')
            .then(users => {
                if (users.map(user => user.role).includes('USER')) {
                    res.json({
                        message:
                            'Success! You can not see this without a token',
                    })
                } else {
                    res.status(UNAUTHORIZED).json({
                        message:
                            'Access denied! You do not have the required permissions.',
                    })
                }
            })
    },
)

app.listen(PORT, function() {
    // eslint-disable-next-line no-console
    console.log(`JWT Server running on port ${PORT}`)
})

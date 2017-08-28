import { schema } from 'normalizr'

export const subjectSchema = new schema.Entity('subject')

export const childSchema = new schema.Entity('child', {
    subjects: [subjectSchema],
})

export const userSchema = new schema.Entity('user', {
    children: [childSchema],
})

export const commentSchema = new schema.Entity('comment', {
    user: userSchema,
})

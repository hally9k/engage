import { schema } from 'normalizr'

export const sessionSchema = new schema.Entity('session')

export const activitySchema = new schema.Entity('activity', {
    sessions: [sessionSchema]
})

export const subjectSchema = new schema.Entity('subject', {
    activities: [activitySchema]
})

export const childSchema = new schema.Entity('child', {
    subjects: [subjectSchema]
})

export const userSchema = new schema.Entity('user', {
    children: [childSchema]
})

export const messageSchema = new schema.Entity('message', {
    user: userSchema
})

export const conversationSchema = new schema.Entity('conversation', {
    messages: [messageSchema]
})

// activitySchema.define({
//     subject: subjectSchema
// })

sessionSchema.define({
    activity: activitySchema,
    child: childSchema
})

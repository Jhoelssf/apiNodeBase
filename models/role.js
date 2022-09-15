import mongoose from 'mongoose'

const { Schema, model } = mongoose

const RoleSchema = Schema({
    role: {
        type: String,
        required: [true, 'Role is obligatory']
    }
})

export const RoleModel = model('Role', RoleSchema)

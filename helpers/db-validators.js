import mongoose from 'mongoose'
import { RoleModel } from '../models/role.js'
import { UserModel } from '../models/user.js'

const { isValidObjectId } = mongoose

export const isAValidRole = async (role = '') => {
    const existRole = await RoleModel.findOne({ role })
    if (!existRole) {
        throw new Error(`Role ${role} is not in the BD`)
    }
}
// Verify email exists
export const isAValidEmail = async (email = '') => {
    const existsEmail = await UserModel.findOne({ email })
    if (existsEmail) {
        throw new Error(`The email ${email} is already registered`)
    }
}

export const existsUserByID = async (id) => {
    const isValid = isValidObjectId(id)
    if (isValid) {
        const existIDUser = await UserModel.findById(id)
        if (!existIDUser) {
            throw new Error(`The id ${id} doesn't exist`)
        }
    } else {
        throw new Error(`${id} Its not a valid id`)
    }
}

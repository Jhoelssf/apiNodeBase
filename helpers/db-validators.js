import { RoleModel } from '../models/role.js'

export const isAValidRole = async (role = '') => {
    const existRole = await RoleModel.findOne({ role })
    if (!existRole) {
        throw new Error(`Role ${role} is not in the BD`)
    }
}

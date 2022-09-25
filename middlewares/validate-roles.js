import { RoleModel } from '../models/role.js'

export const validateIsAdmin = (req, res, next) => {
    const user = req.user
    if (!user) {
        return res.status(500).json({
            msg: 'I want validate role first'
        })
    }
    const { role, name } = user
    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} is not an administrator`
        })
    }

    next()
}

export const hasRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'I want validate role first'
            })
        }
        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `Insuficient permissions`
            })
        }
        next()
    }
}

// export const hasRoleX = async (req, res, next) => {
//     const user = req.user
//     if (!user) {
//         return res.status(500).json({
//             msg: 'I want validate role first'
//         })
//     }
//     const listRoles = await RoleModel.find(query)
//     const query = { status: true }
//     if (!listRoles.includes(user.role)) {
//         return res.status(400).json({
//             msg: 'Invalid role'
//         })
//     }
//     // return (req, res, next) => {
//     //     const query = { status: true }
//     //     listRoles.forEach((curRole) => {})
//     // }
// }

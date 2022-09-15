import bcryptjs from 'bcryptjs'
import { UserModel } from '../models/user.js'
const { genSaltSync, hashSync } = bcryptjs

export const getUsers = async (req = request, res = response) => {
    // const { q, name = 'No name', apiKey } = req.query
    const { limit = 5, offset = 0 } = req.query
    const query = { state: true }
    const users = await UserModel.find(query).skip(Number(offset)).limit(Number(limit))

    const total = await UserModel.countDocuments(query)
    res.json({
        total,
        users
    })
}
export const updateUsers = async (req, res) => {
    const id = req.params.id
    const { _id, password, google, email, ...other } = req.body
    // TODO: validate with database
    if (password) {
        const salt = genSaltSync()
        other.password = hashSync(password, salt)
    }

    const user = await UserModel.findByIdAndUpdate(id, other)

    res.json({
        user
    })
}
export const addUser = async (req, res) => {
    const { name, email, password, role } = req.body
    const user = new UserModel({ name, email, password, role })

    // encrypt password
    // const salt = bcryptjs.genSaltSync()
    const salt = genSaltSync()
    user.password = hashSync(password, salt)

    // save in bd
    await user.save()
    res.json({
        user
    })
}
export const deleteUser = async (req, res) => {
    const { id } = req.params
    const user = await UserModel.findByIdAndUpdate(id, { state: false })
    res.json(user)
}
export const patchUser = (req, res) => {
    res.json({
        msg: 'Patch Hello from controller'
    })
}

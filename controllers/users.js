import { User } from '../models/user.js'
import bcryptjs from 'bcryptjs'
const { genSaltSync, hashSync } = bcryptjs

export const getUsers = (req = request, res = response) => {
    const { q, name = 'No name', apiKey } = req.query

    res.json({
        msg: 'Get Hello from controller',
        q,
        name,
        apiKey
    })
}
export const updateUsers = (req, res) => {
    const id = req.params.idUser
    res.json({
        msg: `The user with user ID ${id}`
    })
}
export const addUser = async (req, res) => {
    const { name, email, password, role } = req.body
    const user = new User({ name, email, password, role })
    // Verify email exists
    const existsEmail = await User.findOne({ email })
    if (existsEmail) {
        return res.status(400).json({
            msg: 'This email is already registered'
        })
    }

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
export const deleteUser = (req, res) => {
    res.json({
        msg: 'Delete Hello from controller'
    })
}
export const patchUser = (req, res) => {
    res.json({
        msg: 'Patch Hello from controller'
    })
}

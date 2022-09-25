import express from 'express'
import { UserModel } from '../models/user.js'
import bcryptjs from 'bcryptjs'
import { genJWT } from '../helpers/jwt-gen.js'

const { response } = express

export const login = async (req, res = response) => {
    const { email, password } = req.body
    try {
        // verify email exists
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                msg: `User / Password doesn't exist - email`
            })
        }
        // verify user is active
        if (!user) {
            return res.status(400).json({
                msg: `User / Password doesn't exist - status: false`
            })
        }
        // verify password
        const validPassword = bcryptjs.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(400).json({
                msg: `User / Password doesn't exist - password`
            })
        }
        // gen jwt
        const token = await genJWT(user.id)
        const { name, role } = user
        res.json({
            user,
            token
        })
    } catch (e) {
        console.log(e)
        return res.json({
            msg: 'Contact to admin'
        })
    }
}

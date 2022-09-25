import jwt from 'jsonwebtoken'
import { UserModel } from '../models/user.js'

export const validateJWT = async (req, res, next) => {
    const token = req.headers['token']
    if (!token) {
        return res.status(401).json({
            msg: `Error: Can't get token`
        })
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const user = await UserModel.findById(uid)
        if (!user) {
            return res.status(401).json({
                msg: `Invalid token: user doesn't exist`
            })
        }

        //verify user is active
        if (!user.state) {
            return res.status(401).json({
                msg: `Invalid token: status false`
            })
        }
        req.user = user

        next()
    } catch (e) {
        console.log(e)
        return res.status(401).json({
            msg: `Invalid token`
        })
    }
}

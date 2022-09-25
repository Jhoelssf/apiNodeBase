import { Router } from 'express'
import { check } from 'express-validator'
import { login } from '../controllers/auth.js'
import { validateFields } from '../middlewares/validate-fields.js'

export const authRouter = Router()

authRouter.post(
    '/login',
    [
        check('email', 'email is required').isEmail(),
        check('password', 'password is required').not().isEmpty(),
        validateFields
    ],
    login
)

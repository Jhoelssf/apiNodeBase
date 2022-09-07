import { Router } from 'express'
import { check } from 'express-validator'
import { getUsers, updateUsers, addUser, deleteUser, patchUser } from '../controllers/users.js'
import { validateFields } from '../middlewares/validate-fields.js'

export const router = Router()

router.get('/', getUsers)
router.put('/:idUser', updateUsers)
router.post(
    '/',
    [
        check('email', 'Email is not valid').isEmail(),
        check('name', 'The name is required').not().isEmpty(),
        check('password', 'Password should have 6 or more characters').isLength({ min: 6 }),
        check('role', 'This is not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        validateFields
    ],
    addUser
)
router.delete('/', deleteUser)
router.patch('/', patchUser)

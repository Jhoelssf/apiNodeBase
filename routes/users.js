import { Router } from 'express'
import { check } from 'express-validator'
import { getUsers, updateUsers, addUser, deleteUser, patchUser } from '../controllers/users.js'
import { isAValidRole } from '../helpers/db-validators.js'
import { validateFields } from '../middlewares/validate-fields.js'

export const router = Router()

router.get('/', getUsers)
router.put('/:idUser', updateUsers)
router.post(
    '/',
    [
        check('email', 'Email is not valid').isEmail(),
        check('name', 'The name is required').not().isEmpty(),
        check('password', 'Password is required and should have 6 or more characters').isLength({ min: 6 }),
        // check('role', 'This is not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('role').custom(isAValidRole),
        validateFields
    ],
    addUser
)
router.delete('/', deleteUser)
router.patch('/', patchUser)

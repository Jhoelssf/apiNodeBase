import { Router } from 'express'
import { check } from 'express-validator'
import { getUsers, updateUsers, addUser, deleteUser, patchUser, activateUser } from '../controllers/users.js'
import { existsUserByID, isAValidEmail, isAValidRole } from '../helpers/db-validators.js'
import { validateFields } from '../middlewares/validate-fields.js'
import { validateJWT } from '../middlewares/validate-jwt.js'
import { hasRole, validateIsAdmin } from '../middlewares/validate-roles.js'

export const router = Router()

router.get('/', getUsers)
router.put('/:id', [check('id').custom(existsUserByID), validateFields], updateUsers)
router.post(
    '/',
    [
        check('email', 'Email is not valid').isEmail(),
        check('email').custom(isAValidEmail),
        check('name', 'The name is required').not().isEmpty(),
        check('password', 'Password is required and should have 6 or more characters').isLength({ min: 6 }),
        // check('role', 'This is not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('role').custom(isAValidRole),
        validateFields
    ],
    addUser
)
router.delete(
    '/:id',
    [validateJWT, hasRole('ADMIN_ROLE', 'SALES_ROLE'), check('id').custom(existsUserByID), validateFields],
    deleteUser
)
router.post('/activate', [validateJWT, check('uid').custom(existsUserByID), validateFields], activateUser)
router.patch('/', patchUser)

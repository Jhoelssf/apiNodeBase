import { Router } from 'express'
import { getUsers, updateUsers, addUser, deleteUser, patchUser } from '../controllers/users.js'

export const router = Router()

router.get('/', getUsers)
router.put('/:idUser', updateUsers)
router.post('/', addUser)
router.delete('/', deleteUser)
router.patch('/', patchUser)

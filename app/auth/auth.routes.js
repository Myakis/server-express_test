import { authUser, regUser } from './auth.controller.js'
import express from 'express'

const router = express.Router()

router.route('/login').post(authUser)
router.route('/register').post(regUser)

export default router

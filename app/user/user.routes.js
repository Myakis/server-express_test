import express from 'express'
import { protect } from '../../middleware/auth.js'
import { getProfile } from './user.controller.js'

const router = express.Router()

router.route('/profile').get(protect, getProfile)

export default router

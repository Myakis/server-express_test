import express from 'express'
import { protect } from '../../middleware/auth.js'
import { createExercise, deleteExercise, updateExercise } from './exercise.controller.js'

const router = express.Router()

router.route('/create').post(protect, createExercise)
router.route('/update').put(protect, updateExercise)
router.route('/delete/:id').delete(protect, deleteExercise)

export default router

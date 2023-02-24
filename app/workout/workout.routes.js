import express from 'express'
import { protect } from '../../middleware/auth.js'
import { createWorkout, deleteWorkout, getWorkout, getWorkouts, updateWorkout } from './workout.controller.js'

const router = express.Router()

router.route('/').get(protect, getWorkouts)
router.route('/:id').get(protect, getWorkout)
router.route('/create').post(protect, createWorkout)
router.route('/update').put(protect, updateWorkout)
router.route('/delete/:id').delete(protect, deleteWorkout)

export default router
import express from 'express'
import { protect } from '../../middleware/auth.js'
import { getWorkoutLog } from './log/get-workout-log.controller.js'
import { updateWorkoutLog } from './log/update-workout-log.controller.js'
import { createWorkoutLog } from './log/workout-log.controller.js'
import { createWorkout, deleteWorkout, getWorkout, getWorkouts, updateWorkout } from './workout.controller.js'

const router = express.Router()

router.route('/').get(protect, getWorkouts)
router.route('/:id').get(protect, getWorkout)
router.route('/create').post(protect, createWorkout)
router.route('/update').put(protect, updateWorkout)
router.route('/delete/:id').delete(protect, deleteWorkout)
router.route('/log/:id').post(protect, createWorkoutLog).get(protect,getWorkoutLog )
router.route('/log/complete/:id').patch(protect, updateWorkoutLog)


export default router

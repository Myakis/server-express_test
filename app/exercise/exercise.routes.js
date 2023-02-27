import express from 'express'
import { protect } from '../../middleware/auth.js'
import {
  createExercise,
  deleteExercise,
  getExercise,
  updateExercise,
} from './exercise.controller.js'
import { createExerciseLog } from './log/exercise-log.controller.js'
import { getExerciseLog } from './log/get-exercise-log.controller.js'
import { completedExerciseLog, updateExerciseLogTime } from './log/update-exercise-log.controller.js'

const router = express.Router()

router.route('/').get(protect, getExercise)
router.route('/create').post(protect, createExercise)
router.route('/update').put(protect, updateExercise)
router.route('/delete/:id').delete(protect, deleteExercise)
router.route('/log/:id').post(protect, createExerciseLog).get(protect, getExerciseLog)
router.route('/log/time/:id').put(protect, updateExerciseLogTime)
router.route('/log/complete/:id').patch(protect, completedExerciseLog)

export default router

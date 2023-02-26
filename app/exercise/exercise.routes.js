import express from 'express'
import { protect } from '../../middleware/auth.js'
import { createExercise, deleteExercise, getExercise, updateExercise } from './exercise.controller.js'
import { createExerciseLog } from './log/exercise-log.controller.js'

const router = express.Router()

router.route('/').get(protect, getExercise)
router.route('/create').post(protect, createExercise)
router.route('/update').put(protect, updateExercise)
router.route('/delete/:id').delete(protect, deleteExercise)
router.route('/log/:exerciseId').post(protect, createExerciseLog)

export default router

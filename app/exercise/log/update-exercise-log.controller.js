import asyncHandler from 'express-async-handler'
import { prisma } from '../../../prisma.js'

export const updateExerciseLogTime = asyncHandler(async (req, res) => {
  const exerciseTimeId = +req.params.id
  const { weight, repeat, isCompleted } = req.body
  try {
    const exerciseLogTime = await prisma.exerciseTime.update({
      where: {
        id: +exerciseTimeId,
      },
      data: { weight, repeat, isCompleted },
    })
    res.json(exerciseLogTime)
  } catch (error) {
    res.status(404)
    throw new Error('Лог времени упражнения не найдено')
  }
})

export const completedExerciseLog = asyncHandler(async (req, res) => {
  const exerciseTimeId = +req.params.id
  const { isCompleted } = req.body
  try {
    const exerciseLog = await prisma.exerciseLog.update({
      where: {
        id: +exerciseTimeId,
      },
      data: { isCompleted },
      include: {
        exercise: true,
        workoutLog: true,
      },
    })
    res.json(exerciseLog)
  } catch (error) {
    res.status(404)
    throw new Error('Лог времени упражнения не найдено')
  }
})

import asyncHandler from 'express-async-handler'
import { prisma } from '../../../prisma.js'

export const updateWorkoutLog = asyncHandler(async (req, res) => {
  const workoutId = +req.params.id
  console.log(workoutId);
  const { isCompleted } = req.body
  try {
    const workoutLogTime = await prisma.workoutLog.update({
      where: {
        id: +workoutId,
      },
      data: { isCompleted },
    })
    res.json(workoutLogTime)
  } catch (error) {
    res.status(404)
    throw new Error('Лог тренировки не найден')
  }
})


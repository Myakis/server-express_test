import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'
import { UserField } from '../../utils/user.js'

export const getProfile = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id }, select: UserField })
  const countExerciseCompleted = await prisma.exerciseLog.count({
    where: { userId: req.user.id, isCompleted: true },
  })
  const kgs = await prisma.exerciseTime.aggregate({
    where: {
      exerciseLog: {
        userId: +req.user.id,
      },
      isCompleted: true,
    },
    _sum: {
      weight: true,
    },
  })
  const countWorkout = await prisma.workoutLog.count({
    where: { userId: req.user.id, isCompleted: true },
  })
  res.json({
    ...user,
    statistics: [
      { label: 'Минуты', value: Math.ceil(countExerciseCompleted * 2.3) ||0},
      { label: 'Килограммы', value: kgs._sum.weight || 0 },
      { label: 'Тренировки', value: countWorkout || 0 },
    ],
  })
})

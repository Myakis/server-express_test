import asyncHandler from 'express-async-handler'
import { prisma } from '../../../prisma.js'

export const createExerciseLog = asyncHandler(async (req, res) => {
  const exerciseId = +req.params.id
  const exercise = await prisma.exercise.findUnique({
    where: {
      id: exerciseId,
    },
  })
  if (!exercise) {
    res.status(404)
    throw new Error('Упражнение не найдено')
  }
  const timeDefault = []
  for (let i = 0; i < exercise.times; i++) {
    timeDefault.push({
      weight: 0,
      repeat: 0,
    })
  }
  const exerciseLog = await prisma.exerciseLog.create({
    data: {
      user: {
        connect: {
          id: req.user.id,
        },
      },
      exercise: {
        connect: {
          id: exerciseId,
        },
      },
      times: {
        createMany: {
          data: timeDefault,
        },
      },
    },
    include: {
      times: true,
    },
  })
  res.json(exerciseLog)
})

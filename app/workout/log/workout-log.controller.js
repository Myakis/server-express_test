import asyncHandler from 'express-async-handler'
import { prisma } from '../../../prisma.js'

export const createWorkoutLog = asyncHandler(async (req, res) => {
  const workoutId = +req.params.id

  const workout = await prisma.workout.findUnique({
    where: {
      id: workoutId,
    },
    include: {
      exercises: true,
    },
  })
  console.log('workout',workout);
  if (!workout) {
    res.status(404)
    throw new Error('Тренировка не найдена')
  }
  const timeDefault = []
  for (let i = 0; i < workout.times; i++) {
    timeDefault.push({
      weight: 0,
      repeat: 0,
    })
  }
  const workoutLog = await prisma.workoutLog.create({
    data: {
      user: {
        connect: {
          id: req.user.id,
        },
      },
      workout: {
        connect: {
          id: workoutId,
        },
      },
      exerciseLogs: {
        create: workout.exercises.map((exercise) => ({
          exercise: {
            connect: {
              id: exercise.id,
            },
          },
          times: {
            create: Array.from({ length: exercise.times }, () => ({ weight: 0, repeat: 0 })),
          },
        })),
      },
    },
    include: {
      exerciseLogs: {
        include: {
          times: true,
        },
      },
    },
  })
  res.json(workoutLog)
})

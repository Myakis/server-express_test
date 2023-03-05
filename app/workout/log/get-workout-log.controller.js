import asyncHandler from 'express-async-handler'
import { prisma } from '../../../prisma.js'
import { addPrevValues } from '../../../utils/addPrevValuesLog.js'
import { getMinutes } from '../getMinutes.js'

export const getWorkoutLog = asyncHandler(async (req, res) => {
  const logId = +req.params.id

  const workoutLog = await prisma.workoutLog.findUnique({
    where: {
      id: logId,
    },
    include: {
      workout: {
        include:{
          exercises:true
        }
      },
      exerciseLogs: {
        orderBy: {
          id: 'asc',
        },
        include: {
          exercise: true,
        },
      },
    },
  })

  if (!workoutLog) {
    res.status(404)
    throw new Error('Лог тренировки не найден')
  }



  const newTimes = getMinutes(workoutLog.workout.exercises.length)

  res.json({ ...workoutLog, minutes: newTimes })
})

import asyncHandler from 'express-async-handler'
import { prisma } from '../../../prisma.js'
import { addPrevValues } from '../../../utils/addPrevValuesLog.js'

export const getExerciseLog = asyncHandler(async (req, res) => {
  const exerciseId = +req.params.id

  const exerciseLog = await prisma.exerciseLog.findUnique({
    where: {
      id: +exerciseId,
    },
    include: {
      exercise: true,
      times: {
        orderBy: {
          id: 'asc',
        },
      },
    },
  })

  if (!exerciseLog) {
    res.status(404)
    throw new Error('Лог упражнения не найдено')
  }

  console.log(exerciseLog)
  const prevExerciseLog = await prisma.exerciseLog.findFirst({
    where: {
      exerciseId: exerciseLog.exerciseId,
      userId: req.user.id,
      isCompleted: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      times: true,
    },
  })

  const newTimes = addPrevValues(exerciseLog, prevExerciseLog)

  res.json({ ...exerciseLog, times: newTimes })
})

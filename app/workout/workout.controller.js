import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

export const getWorkouts = asyncHandler(async (req, res) => {
  const workouts = await prisma.workout.findMany({
    orderBy: { createdAt: 'desc' },
    include: { exercises: true },
  })

  res.json({ items: workouts })
})

export const getWorkout = asyncHandler(async (req, res) => {
  const workout = await prisma.workout.findUnique({
    where: { id: +req.params.id },
    include: { exercises: true },
  })
  if (!workout) {
    res.status(404)
    res.json({ message: 'Тренировки не существует' })
  }
  const minutes = Math.ceil(workout.exercises.length * 3.7)
  res.json({ ...workout, minutes })
})

export const createWorkout = asyncHandler(async (req, res) => {
  const { name, exerciseIds } = req.body
  const workout = await prisma.workout.create({
    data: {
      name,
      exercises: {
        connect: exerciseIds.map((id) => ({
          id: +id,
        })),
      },
    },
  })

  res.json({ ...workout })
})

export const updateWorkout = asyncHandler(async (req, res) => {
  const { id, name, exerciseIds } = req.body
  try {
    await prisma.workout.update({
      where: { id },
      data: {
        name,
        exercises: {
          set: exerciseIds.map((id) => ({
            id: +id,
          })),
        },
      },
    })
    const workouts = await prisma.workout.findMany()

    res.json({ items: workouts, message: `Упражнение с id ${id} успешно обновлено` })
  } catch (error) {
    res.status(404)
    throw new Error('Тренировки не существует')
  }
})

export const deleteWorkout = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    await prisma.workout.delete({ where: { id: Number(id) } })
    const workouts = await prisma.workout.findMany()
    res.json({ items: workouts, message: `Упражнение с id ${id} успешно удалено` })
  } catch (error) {
    res.status(404)
    throw new Error('Тренировки не существует')
  }
})

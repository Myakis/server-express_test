import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'

export const getExercise = asyncHandler(async (req, res) => {
  const exercise = await prisma.exercise.findMany({ orderBy: { createdAt: 'desc' } })
  res.json({ items: exercise })
})

export const createExercise = asyncHandler(async (req, res) => {
  const { name, times, iconPath } = req.body
  const exercise = await prisma.exercise.create({ data: { name, times, iconPath } })

  res.json({ exercise })
})

export const updateExercise = asyncHandler(async (req, res) => {
  const { id, name, times, iconPath } = req.body
  await prisma.exercise.update({ where: { id }, data: { name, times, iconPath } })
  const exercises = await prisma.exercise.findMany()

  res.json({ items: exercises, message: `Упражнение с id ${id} успешно обновлено` })
})

export const deleteExercise = asyncHandler(async (req, res) => {
  const { id } = req.params

  await prisma.exercise.delete({ where: { id: Number(id) } })
  const exercises = await prisma.exercise.findMany()
  res.json({ items: exercises, message: `Упражнение с id ${id} успешно удалено` })
})

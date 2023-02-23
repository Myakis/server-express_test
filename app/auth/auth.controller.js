import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'
import { faker } from '@faker-js/faker'
import { hash } from 'argon2'
import { generateToken } from './generateToken.js'
import { UserField } from '../../utils/user.js'

export const authUser = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany()
  res.json({ message: 'Ты успешно авторизовался', users })
})

export const regUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const isHaveUser = await prisma.user.findUnique({ where: { email } })
  if (isHaveUser) {
    res.status(400)
    res.json({ error: 'Пользователь с таким email уже существует' })
  }
  const user = await prisma.user.create({
    data: { email, password: await hash(password), name: faker.name.fullName() },
    select: UserField,
  })

  const token = generateToken(user.id)
  res.json({ user, token })
})

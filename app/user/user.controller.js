import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'
import { faker } from '@faker-js/faker'
import { hash, verify } from 'argon2'
import { UserField } from '../../utils/user.js'

export const getProfile = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({ where: { id: req.user.id }, select: UserField })

  res.json({ user })
})

import asyncHandler from 'express-async-handler'
import { prisma } from '../../prisma.js'
import { UserField } from '../../utils/user.js'

export const getProfile = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id }, select: UserField })

  res.json({ user })
})

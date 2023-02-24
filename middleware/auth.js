import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { prisma } from '../prisma.js'
import { UserField } from '../utils/user.js'

export const protect = asyncHandler(async (req, res, next) => {
  let token
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    const userFound = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: UserField,
    })
    if (userFound) {
      res.user = userFound
      next()
    } else {
      res.status(401)
      throw new Error('Unauthorized. Token failed')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('Unauthorized. Token dont have')
  }
})

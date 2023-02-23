import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import authRoutes from './app/auth/auth.routes.js'
import { prisma } from './prisma.js'

const app = express()

dotenv.config()

async function main() {
  if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
  app.use(express.json())
  app.use('/api/auth', authRoutes)

  const PORT = process.env.PORT || 5000

  app.listen(PORT, console.log(`Сервер запущен в режиме ${process.env.NODE_ENV} на порту ${PORT}`))
}
main() .then(async () => {
  await prisma.$disconnect()
})
.catch((e) => {
  console.error(e.message)
  prisma.$disconnect()
  process.exit(1)
})
  

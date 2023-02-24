import express from 'express'
import morgan from 'morgan'
import path from 'path'
import dotenv from 'dotenv'
import authRoutes from './app/auth/auth.routes.js'
import userRoutes from './app/user/user.routes.js'
import exerciseRoutes from './app/exercise/exercise.routes.js'
import workoutsRoutes from './app/workout/workout.routes.js'
import { prisma } from './prisma.js'
import { errorHandler, notFound } from './middleware/errors.js'

const app = express()

dotenv.config()

async function main() {
  if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
  app.use(express.json())

  const __dirname = path.resolve()
  app.use('/uploads', express.static(path.join(__dirname, '/uploads/')))

  // Роуты
  app.use('/api/auth', authRoutes)
  app.use('/api/user', userRoutes)
  app.use('/api/exercise', exerciseRoutes)
  app.use('/api/workouts', workoutsRoutes)

  // Middleware для проверки
  app.use(notFound)
  app.use(errorHandler)

  const PORT = process.env.PORT || 5000

  app.listen(PORT, console.log(`Сервер запущен в режиме ${process.env.NODE_ENV} на порту ${PORT}`))
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch((e) => {
    console.error(e.message)
    prisma.$disconnect()
    process.exit(1)
  })

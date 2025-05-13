import Fastify from 'fastify'
import cors from '@fastify/cors'
import { authRoutes } from './routes/authRoutes'
import { userRoutes } from './routes/userRoutes'
import { rankingRoutes } from './routes/rankingRoutes'
import { quizRoutes } from './routes/quizRoutes'
import { adminRoutes } from './routes/adminRoutes'

async function main() {
  const app = Fastify()

  await app.register(cors, {
    origin: true
  })

  app.register(authRoutes)
  app.register(userRoutes)
  app.register(rankingRoutes)
  app.register(quizRoutes)
  app.register(adminRoutes)

  const port = Number(process.env.PORT) || 3000
  await app.listen({ port, host: '0.0.0.0' })

  console.log(`🚀 Servidor rodando em http://localhost:${port}`)
}

main()
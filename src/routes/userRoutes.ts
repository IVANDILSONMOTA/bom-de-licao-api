import { FastifyInstance } from 'fastify'
import { createUserController } from '../controllers/createUser'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', createUserController)
}



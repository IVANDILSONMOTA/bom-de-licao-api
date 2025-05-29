
import { FastifyInstance } from 'fastify'
import { promoverUsuario } from '../controllers/adminController'
import { authenticate } from '../controllers/authController'

export async function adminRoutes(app: FastifyInstance) {
  app.patch('/admin/:userId', { preHandler: [authenticate] }, promoverUsuario)
}

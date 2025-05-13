import { FastifyInstance } from 'fastify'
import { promoteToAdmin } from '../controllers/adminController'
import { authenticate } from '../controllers/authController'

export async function adminRoutes(app: FastifyInstance) {
  app.patch('/admin/:userId', { preHandler: [authenticate] }, promoteToAdmin)
}
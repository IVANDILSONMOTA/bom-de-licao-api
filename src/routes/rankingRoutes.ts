import { FastifyInstance } from 'fastify'
import { getRanking } from '../controllers/rankingController'
import { authenticate } from '../controllers/authController'

export async function rankingRoutes(app: FastifyInstance) {
  app.get('/ranking', { preHandler: [authenticate] }, getRanking)
}
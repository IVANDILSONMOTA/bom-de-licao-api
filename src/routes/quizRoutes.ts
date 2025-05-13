import { FastifyInstance } from 'fastify'
import { getQuizQuestions } from '../controllers/quizController'
import { authenticate } from '../controllers/authController'

export async function quizRoutes(app: FastifyInstance) {
  app.get('/quiz', { preHandler: [authenticate] }, getQuizQuestions)
}
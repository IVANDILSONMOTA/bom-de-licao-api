
import { FastifyInstance } from "fastify";
import { getRandomQuestion } from "../controllers/quizController";

export async function quizRoutes(app: FastifyInstance) {
  app.get("/quiz/random", getRandomQuestion);
}


import { FastifyInstance } from "fastify";
import { submitGameResult, getRanking } from "../controllers/rankingController";
import { authenticate } from "../controllers/authController";

export async function rankingRoutes(app: FastifyInstance) {
  app.post("/game/submit", { preHandler: authenticate }, submitGameResult);
  app.get("/ranking", getRanking);
}

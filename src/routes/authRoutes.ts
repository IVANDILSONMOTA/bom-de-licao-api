
import { FastifyInstance } from "fastify";
import { login, register } from "../controllers/authController";

export async function authRoutes(app: FastifyInstance) {
  app.post("/register", register);
  app.post("/login", login);
}

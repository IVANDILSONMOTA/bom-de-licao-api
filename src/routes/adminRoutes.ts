
import { FastifyInstance } from "fastify";
import { listarPerguntas, deletarPergunta, listarUsuarios, updatePergunta, promoverUsuario } from "../controllers/adminController";
import { adminOnly } from "../controllers/adminOnly";

export async function adminRoutes(app: FastifyInstance) {
  app.get("/api/admin/perguntas", { preHandler: adminOnly }, listarPerguntas);
  app.put("/api/admin/perguntas/:id", { preHandler: adminOnly }, updatePergunta);
  app.delete("/api/admin/perguntas/:id", { preHandler: adminOnly }, deletarPergunta);
  app.get("/api/admin/usuarios", { preHandler: adminOnly }, listarUsuarios);
  app.patch("/api/admin/usuarios/:id/promover", { preHandler: adminOnly }, promoverUsuario);
}

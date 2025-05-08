import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "path";

import { userRoutes } from "./routes/userRoutes";
import { quizRoutes } from "./routes/quizRoutes";
import { authRoutes } from "./routes/authRoutes";
import { rankingRoutes } from "./routes/rankingRoutes";
import { adminRoutes } from "./routes/adminRoutes";

const app = Fastify();

// Servir arquivos estáticos
app.register(require("@fastify/static"), {
  root: path.join(__dirname, "..", "public"),
  prefix: "/",
});

// Registrar rotas
app.register(userRoutes);
app.register(quizRoutes);
app.register(authRoutes);
app.register(rankingRoutes);
app.register(adminRoutes);

// Rota base
app.get("/", async () => {
  return { message: "Bom de Lição API rodando!" };
});

// Ajustado para Render: escutar na porta e host corretos
app.listen({
  port: Number(process.env.PORT) || 3000,
  host: '0.0.0.0'
}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 Servidor rodando em ${address}`);
});

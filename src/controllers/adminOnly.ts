
import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "segredo_super_secreto";

export function adminOnly(request: FastifyRequest, reply: FastifyReply, done: any) {
  const authHeader = request.headers.authorization;
  if (!authHeader) return reply.status(401).send({ error: "Token não fornecido" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    if (!decoded || !decoded.userId) {
      return reply.status(401).send({ error: "Token inválido" });
    }

    if (!decoded.isAdmin) {
      return reply.status(403).send({ error: "Acesso negado: somente administradores" });
    }

    (request as any).user = decoded;
    done();
  } catch (err) {
    reply.status(401).send({ error: "Token inválido" });
  }
}

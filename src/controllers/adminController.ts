import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";

// Listar perguntas
export async function listarPerguntas(request: FastifyRequest, reply: FastifyReply) {
  const perguntas = await prisma.question.findMany({
    orderBy: { createdAt: "desc" }
  });
  return reply.send(perguntas);
}

// Apagar pergunta
export async function deletarPergunta(request: FastifyRequest, reply: FastifyReply) {
  const id = Number((request.params as any).id);
  try {
    await prisma.question.delete({ where: { id } });
    return reply.send({ message: "Pergunta apagada com sucesso." });
  } catch (error) {
    return reply.status(404).send({ error: "Pergunta não encontrada." });
  }
}

// Listar usuários
export async function listarUsuarios(request: FastifyRequest, reply: FastifyReply) {
  const usuarios = await prisma.user.findMany({
    select: { id: true, name: true, email: true, isAdmin: true }
  });
  return reply.send(usuarios);
}

// Atualizar pergunta
export async function updatePergunta(request: FastifyRequest, reply: FastifyReply) {
  const id = Number((request.params as any).id);
  const { question, optionA, optionB, optionC, optionD, answer, category, difficulty } = request.body as any;

  try {
    const atualizada = await prisma.question.update({
      where: { id },
      data: {
        question,
        optionA,
        optionB,
        optionC,
        optionD,
        answer,
        category,
        difficulty
      }
    });
    return reply.send(atualizada);
  } catch (error) {
    return reply.status(404).send({ error: "Pergunta não encontrada para edição." });
  }
}

// Promover usuário a admin
export async function promoverUsuario(request: FastifyRequest, reply: FastifyReply) {
  const id = Number((request.params as any).userId);
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { isAdmin: true }
    });
    return reply.send({ message: "Usuário promovido a administrador.", user });
  } catch (error) {
    return reply.status(404).send({ error: "Usuário não encontrado." });
  }
}

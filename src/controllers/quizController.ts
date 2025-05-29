import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";

export async function getQuizQuestions(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { category, difficulty } = request.query as any;

    const where: any = {};
    if (category) where.category = category;
    if (difficulty) where.difficulty = difficulty;

    const questions = await prisma.question.findMany({ where });

    if (questions.length === 0) {
      return reply.status(404).send({ error: "Nenhuma pergunta encontrada com os filtros." });
    }

    const randomIndex = Math.floor(Math.random() * questions.length);
    const q = questions[randomIndex];

    return reply.send({
      id: q.id,
      question: q.question,
      options: [q.optionA, q.optionB, q.optionC, q.optionD],
      answer: q.answer // Para teste
    });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "Erro ao buscar pergunta" });
  }
}

import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";

export async function submitGameResult(request: FastifyRequest, reply: FastifyReply) {
  const { score, duration } = request.body as any;
  const userId = (request as any).user.userId;

  try {
    const session = await prisma.gameSession.create({
      data: {
        userId,
        score,
        duration
      }
    });
    return reply.status(201).send({ message: "Pontuação registrada!", session });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "Erro ao salvar pontuação" });
  }
}

export async function getRanking(request: FastifyRequest, reply: FastifyReply) {
  try {
    const top = await prisma.gameSession.findMany({
      orderBy: [
        { score: "desc" },
        { duration: "asc" }
      ],
      include: {
        user: {
          select: { name: true }
        }
      },
      take: 10
    });

    const ranking = top.map((item: any, index: number) => ({
      rank: index + 1,
      name: item.user.name,
      score: item.score,
      time: item.duration
    }));

    return reply.send({ ranking });
  } catch (error) {
    console.error(error);
    return reply.status(500).send({ error: "Erro ao obter ranking" });
  }
}

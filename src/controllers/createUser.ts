import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../lib/prisma'
import { Prisma } from '@prisma/client'

export async function createUserController(request: FastifyRequest, reply: FastifyReply) {
  const data = request.body as Prisma.UserCreateInput

  const user = await prisma.user.create({ data })

  return reply.code(201).send({
    message: 'Usuário criado com sucesso!',
    data: user
  })
}

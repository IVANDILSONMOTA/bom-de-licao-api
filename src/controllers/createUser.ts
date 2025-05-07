import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../lib/prisma'

export async function createUserController(request: FastifyRequest, reply: FastifyReply) {
  const { name, contact, email } = request.body as {
    name: string
    contact: string
    email?: string
  }

  const user = await prisma.user.create({
    data: {
      name,
      contact,
      email,
    },
  })

  return reply.code(201).send({
    message: 'Usuário criado com sucesso!',
    data: user
  })
}



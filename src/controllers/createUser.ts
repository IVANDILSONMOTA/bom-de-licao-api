import type { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../lib/prisma'

export async function createUserController(request: FastifyRequest, reply: FastifyReply) {
  const {
    name,
    contact,
    email,
    cpf,
    birthDate,
    state,
    city,
    district,
    church
  } = request.body as {
    name: string
    contact: string
    email?: string
    cpf: string
    birthDate: string
    state: string
    city: string
    district: string
    church: string
  }

  const user = await prisma.user.create({
    data: {
      name,
      contact,
      email,
      cpf,
      birthDate: new Date(birthDate),
      state,
      city,
      district,
      church
    }
  })

  return reply.code(201).send({
    message: 'Usuário criado com sucesso!',
    data: user
  })
}
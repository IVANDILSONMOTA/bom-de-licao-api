import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "segredo_super_secreto";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const {
    name,
    contact,
    email,
    password,
    cpf,
    birthDate,
    state,
    city,
    district,
    church
  } = request.body as {
    name: string
    contact: string
    email: string
    password: string
    cpf: string
    birthDate: string
    state: string
    city: string
    district: string
    church: string
  };

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      contact,
      email,
      password: hashedPassword,
      cpf,
      birthDate: new Date(birthDate),
      state,
      city,
      district,
      church
    }
  });

  return reply.status(201).send({ message: "Usuário registrado com sucesso!", userId: user.id });
}

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = request.body as { email: string; password: string };

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return reply.status(400).send({ error: "Usuário não encontrado" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return reply.status(401).send({ error: "Senha incorreta" });

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      isAdmin: user.isAdmin
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return reply.send({ token });
}

export function authenticate(request: FastifyRequest, reply: FastifyReply, done: () => void) {
  const authHeader = request.headers.authorization;
  if (!authHeader) return reply.status(401).send({ error: "Token não fornecido" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (request as any).user = decoded;
    done();
  } catch (err) {
    return reply.status(401).send({ error: "Token inválido" });
  }
}
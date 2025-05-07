import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";

async function criarAdmin() {
  const senhaCriptografada = await bcrypt.hash("123456", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@email.com" },
    update: {},
    create: {
      name: "Administrador",
      email: "admin@email.com",
      password: senhaCriptografada,
      contact: "11999999999",
      isAdmin: true
    }
  });

  console.log("✅ Admin criado:", admin);
  process.exit();
}

criarAdmin();

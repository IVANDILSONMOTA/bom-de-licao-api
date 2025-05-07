
import { prisma } from "./lib/prisma";

async function seed() {
  await prisma.question.createMany({
    data: [
      {
        question: "Quem batizou Jesus?",
        optionA: "Pedro",
        optionB: "João Batista",
        optionC: "Tiago",
        optionD: "Paulo",
        answer: "João Batista",
        category: "Evangelhos",
        difficulty: "Fácil"
      },
      {
        question: "Qual o último livro da Bíblia?",
        optionA: "Mateus",
        optionB: "Gênesis",
        optionC: "Apocalipse",
        optionD: "João",
        answer: "Apocalipse",
        category: "Profecia",
        difficulty: "Médio"
      },
      {
        question: "Quem interpretou os sonhos do faraó no Egito?",
        optionA: "Daniel",
        optionB: "Moisés",
        optionC: "José",
        optionD: "Elias",
        answer: "José",
        category: "Pentateuco",
        difficulty: "Difícil"
      }
    ]
  });

  console.log("📚 Perguntas com categorias e dificuldade inseridas!");
  process.exit();
}

seed();

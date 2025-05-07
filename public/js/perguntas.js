
async function carregarPerguntas() {
  const res = await fetch("/questions");
  const perguntas = await res.json();

  const container = document.getElementById("lista-perguntas");
  container.innerHTML = "";

  perguntas.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <strong>${p.question}</strong><br/>
      <em>Categoria:</em> ${p.category} - <em>Dificuldade:</em> ${p.difficulty}<br/>
      <button onclick="editarPergunta(${p.id})">Editar</button>
      <button onclick="excluirPergunta(${p.id})">Excluir</button>
    `;
    container.appendChild(div);
  });
}

function editarPergunta(id) {
  alert("Função de edição de pergunta ainda será implementada.");
}

async function excluirPergunta(id) {
  if (confirm("Tem certeza que deseja excluir esta pergunta?")) {
    await fetch("/admin/questions/" + id, { method: "DELETE" });
    carregarPerguntas();
  }
}

carregarPerguntas();


async function carregarUsuarios() {
  const res = await fetch("/admin/users");
  const usuarios = await res.json();

  const container = document.getElementById("lista-usuarios");
  container.innerHTML = "";

  usuarios.forEach(u => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <strong>${u.name}</strong> (${u.email})<br/>
      Admin: ${u.isAdmin ? "✅" : "❌"}<br/>
      <button onclick="excluirUsuario(${u.id})">Excluir</button>
      ${!u.isAdmin ? `<button onclick="promoverUsuario(${u.id})">Tornar Admin</button>` : ""}
    `;
    container.appendChild(div);
  });
}

async function excluirUsuario(id) {
  if (confirm("Deseja realmente excluir este usuário?")) {
    await fetch("/admin/users/" + id, { method: "DELETE" });
    carregarUsuarios();
  }
}

async function promoverUsuario(id) {
  if (confirm("Deseja promover este usuário a administrador?")) {
    await fetch("/admin/users/" + id + "/promote", { method: "PATCH" });
    carregarUsuarios();
  }
}

carregarUsuarios();

const ID_USUARIO = 1;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('tarefa-form');
  const tarefasContainer = document.getElementById('tarefas-container');

  async function carregarSubtarefas(idTarefa) {
    const res = await fetch('/api/subtarefas');
    const todasSubtarefas = await res.json();
    return todasSubtarefas.filter(sub => sub.id_tarefa === idTarefa);
  }

async function carregarTarefas() {
  const res = await fetch('/api/tarefas');
  const tarefas = await res.json();

  tarefasContainer.innerHTML = '';

  for (const tarefa of tarefas) {
    const li = document.createElement('li');
    const subtarefas = await carregarSubtarefas(tarefa.id);
    const subtarefasHTML = subtarefas.map(sub =>
      `<li>
      ${sub.title} - ${sub.concluido ? '✅' : '🕒'}<br/>
      ${sub.descricao}
      <button class="editar-sub" data-id="${sub.id}">✏️</button>
      <button class="excluir-sub" data-id="${sub.id}">🗑️</button>
    </li>`
  ).join('');


  li.innerHTML = `
    <strong>${tarefa.titulo}</strong><br/>
    ${tarefa.descricao}<br/>
    Criada em: ${new Date(tarefa.data_criada).toLocaleDateString('pt-BR')}<br/>
    Entrega: ${new Date(tarefa.data_de_entrega).toLocaleDateString('pt-BR')}<br/>
    Status: ${tarefa.concluido ? 'Concluído' : 'Pendente'}<br/>

    <button class="editar-tarefa" data-id="${tarefa.id}">✏️ Editar</button>
    <button class="excluir-tarefa" data-id="${tarefa.id}">🗑️ Excluir</button>

    <ul>${subtarefasHTML}</ul>

    <button class="toggle-subtarefa-form" data-id="${tarefa.id}">Adicionar Subtarefa ></button>
    <div class="subtarefa-form-container" id="form-container-${tarefa.id}" style="display: none;">
      <form class="subtarefa-form" data-id="${tarefa.id}">
        <input type="text" name="title" placeholder="Título da subtarefa" required />
        <input type="text" name="descricao" placeholder="Descrição" required />
        <button type="submit">Criar Subtarefa</button>
      </form>
    </div>
    <hr/>
  `;


    tarefasContainer.appendChild(li);
  }

  // Mostrar/esconder formulário ao clicar no botão +
  document.querySelectorAll('.toggle-subtarefa-form').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const container = document.getElementById(`form-container-${id}`);
      const isVisible = container.style.display === 'block';

      container.style.display = isVisible ? 'none' : 'block';
      btn.textContent = isVisible ? 'Adicionar Subtarefa >' : 'Remover Subtarefa v';
      btn.classList.toggle('active-button', !isVisible);
    });
  });

  // Submeter formulário de subtarefa
  document.querySelectorAll('.subtarefa-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const idTarefa = form.dataset.id;
      const title = form.querySelector('input[name="title"]').value;
      const descricao = form.querySelector('input[name="descricao"]').value;

      await fetch('/api/subtarefas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          descricao,
          ordem: 1,
          concluido: false,
          id_tarefa: parseInt(idTarefa),
        })
      });

      carregarTarefas();
    });
  });
}

// Excluir tarefa
document.querySelectorAll('.excluir-tarefa').forEach(btn => {
  btn.addEventListener('click', async () => {
    const id = btn.dataset.id;
    await fetch(`/api/tarefas/${id}`, { method: 'DELETE' });
    carregarTarefas();
  });
});

// Editar tarefa
document.querySelectorAll('.editar-tarefa').forEach(btn => {
  btn.addEventListener('click', async () => {
    const id = btn.dataset.id;
    const novaDescricao = prompt('Nova descrição:');
    const novoTitulo = prompt('Novo título:');
    const novaDataEntrega = prompt('Nova data de entrega (AAAA-MM-DD):');

    if (!novaDescricao || !novoTitulo || !novaDataEntrega) return;

    await fetch(`/api/tarefas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo: novoTitulo,
        descricao: novaDescricao,
        data_de_entrega: novaDataEntrega,
        concluido: false
      })
    });

    carregarTarefas();
  });
});

// Excluir subtarefa
document.querySelectorAll('.excluir-sub').forEach(btn => {
  btn.addEventListener('click', async () => {
    const id = btn.dataset.id;
    await fetch(`/api/subtarefas/${id}`, { method: 'DELETE' });
    carregarTarefas();
  });
});

// Editar subtarefa
document.querySelectorAll('.editar-sub').forEach(btn => {
  btn.addEventListener('click', async () => {
    const id = btn.dataset.id;
    const novoTitulo = prompt('Novo título da subtarefa:');
    const novaDescricao = prompt('Nova descrição da subtarefa:');
    const novaOrdem = prompt('Nova ordem:');
    const concluido = confirm('Marcar como concluído?');

    if (!novoTitulo || !novaDescricao || !novaOrdem) return;

    await fetch(`/api/subtarefas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: novoTitulo,
        descricao: novaDescricao,
        ordem: parseInt(novaOrdem),
        concluido
      })
    });

    carregarTarefas();
  });
});


  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const novaTarefa = {
      titulo: document.getElementById('titulo').value,
      descricao: document.getElementById('descricao').value,
      data_criada: new Date().toISOString().split('T')[0],
      data_de_entrega: document.getElementById('data_de_entrega').value,
      concluido: false,
      id_usuario: ID_USUARIO,  // <- use a constante que define o usuário logado
    };

    await fetch('/api/tarefas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaTarefa),
    });

    form.reset();
    carregarTarefas();
  });

  carregarTarefas();
});

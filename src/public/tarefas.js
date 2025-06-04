const ID_USUARIO = 1;

async function carregarSubtarefas(idTarefa) {
  const res = await fetch('/api/subtarefas');
  const todasSubtarefas = await res.json();
  return todasSubtarefas.filter(sub => sub.id_tarefa === idTarefa);
}

async function carregarTarefas() {
  const res = await fetch('/api/tarefas');
  const tarefas = await res.json();

  const tarefasContainer = document.getElementById('tarefas-container');
  tarefasContainer.innerHTML = '';

  for (const tarefa of tarefas) {
    const li = document.createElement('li');
    const subtarefas = await carregarSubtarefas(tarefa.id);
    const subtarefasHTML = subtarefas.map(sub =>
     `<li>
        <div class="subtarefa ${sub.concluido ? 'concluida' : ''}" data-id="${sub.id}" style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; padding: 8px 0;">
            <div style="flex-grow: 1;">
            <div><strong class="subtarefa-title">${sub.title}</strong></div>
            <div class="subtarefa-desc">${sub.descricao}</div>
            <div class="subtarefa-status">Status: ${sub.concluido ? 'Concluído ✅' : 'Pendente 🕒'}</div>
        </div>
        <div class="subtarefa-acoes" style="display: flex; flex-direction: column; gap: 5px;">
            <button class="editar-sub" data-id="${sub.id}">✏️</button>
            <button class="excluir-sub" data-id="${sub.id}">🗑️</button>
        </div>
        </div>
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

  inicializarEventosTarefa();
  inicializarEventosSubtarefa(); // função definida em subtarefas.js
}

// Expõe globalmente para subtarefas.js poder chamar depois de ações que alteram subtarefas
window.carregarTarefas = carregarTarefas;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('tarefa-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const novaTarefa = {
      titulo: document.getElementById('titulo').value,
      descricao: document.getElementById('descricao').value,
      data_criada: new Date().toISOString().split('T')[0],
      data_de_entrega: document.getElementById('data_de_entrega').value,
      concluido: false,
      id_usuario: ID_USUARIO,
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

// Funções para edição e exclusão de tarefas + toggle do formulário de subtarefa
function inicializarEventosTarefa() {
  document.querySelectorAll('.editar-tarefa').forEach(btn => {
    btn.addEventListener('click', () => {
      const li = btn.closest('li');
      const id = btn.dataset.id;

      const tituloStrong = li.querySelector('strong');
      const descLine = tituloStrong.nextSibling;
      const entregaLine = [...li.childNodes].find(n => n.textContent?.includes('Entrega:'));
      const statusLine = [...li.childNodes].find(n => n.textContent?.includes('Status:'));

      const inputTitulo = document.createElement('input');
      inputTitulo.value = tituloStrong.textContent;

      const inputDescricao = document.createElement('input');
      inputDescricao.value = descLine.textContent.trim();

      const inputDataEntrega = document.createElement('input');
      inputDataEntrega.type = 'date';
      inputDataEntrega.value = entregaLine.textContent.split('Entrega: ')[1].trim().split('/').reverse().join('-');

      const checkboxConcluido = document.createElement('input');
      checkboxConcluido.type = 'checkbox';
      checkboxConcluido.checked = statusLine.textContent.includes('Concluído');

      const statusLabel = document.createElement('label');
      statusLabel.style.display = 'flex';
      statusLabel.style.alignItems = 'center';
      statusLabel.style.gap = '8px';
      statusLabel.textContent = 'Status: ';
      statusLabel.appendChild(checkboxConcluido);

      // Botões
      const salvarBtn = document.createElement('button');
      salvarBtn.textContent = 'Salvar';

      const excluirBtn = li.querySelector('.excluir-tarefa');
      const descartarBtn = document.createElement('button');
      descartarBtn.textContent = '❌ Descartar alterações';
      descartarBtn.style.marginLeft = '10px';

      // Eventos dos botões
      salvarBtn.addEventListener('click', async () => {
        await fetch(`/api/tarefas/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            titulo: inputTitulo.value,
            descricao: inputDescricao.value,
            data_de_entrega: inputDataEntrega.value,
            concluido: checkboxConcluido.checked
          })
        });

        window.carregarTarefas();
      });

      descartarBtn.addEventListener('click', () => {
        carregarTarefas(); // Apenas recarrega a lista original
      });

      // Substituir conteúdo por inputs
      tituloStrong.replaceWith(inputTitulo);
      descLine.replaceWith(inputDescricao);
      entregaLine.replaceWith(inputDataEntrega);
      statusLine.replaceWith(statusLabel);
      btn.replaceWith(salvarBtn);
      excluirBtn.replaceWith(descartarBtn);
    });
  });

  document.querySelectorAll('.excluir-tarefa').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      await fetch(`/api/tarefas/${id}`, { method: 'DELETE' });
      carregarTarefas();
    });
  });

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
}
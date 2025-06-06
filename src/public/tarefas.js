const ID_USUARIO = window.usuario?.id;

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
          <div class="subtarefa-acoes">
            <button class="editar-sub icon-btn" data-id="${sub.id}" title="Editar"><i data-feather="edit"></i></button>
            <button class="excluir-sub icon-btn" data-id="${sub.id}" title="Excluir"><i data-feather="trash-2"></i></button>
          </div>
        </div>
      </li>`
    ).join('');

    li.innerHTML = `
      <strong>${tarefa.titulo}</strong><br/>
      <div class="tarefa-descricao">${tarefa.descricao}</div><br/>
      Criada em: ${new Date(tarefa.data_criada).toLocaleDateString('pt-BR')}<br/>
      Entrega: ${new Date(tarefa.data_de_entrega).toLocaleDateString('pt-BR')}<br/>
      Status: ${tarefa.concluido ? 'Concluído ✅' : 'Pendente 🕒'}<br/>

      <button class="editar-tarefa icon-btn" data-id="${tarefa.id}" title="Editar"><i data-feather="edit"></i></button>
      <button class="excluir-tarefa icon-btn" data-id="${tarefa.id}" title="Excluir"><i data-feather="trash-2"></i></button>

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
  inicializarEventosSubtarefa();

  feather.replace();
}

window.carregarTarefas = carregarTarefas;

function mostrarPerfilUsuario() {
  const perfilInfo = document.getElementById('perfil-info');
  const perfilAvatar = document.getElementById('perfil-avatar');
  const usuarioJSON = localStorage.getItem('usuario');

  if (!usuarioJSON) {
    perfilInfo.innerHTML = '<p>Usuário não logado.</p>';
    perfilAvatar.src = '';
    return;
  }

  const usuario = JSON.parse(usuarioJSON);
  const avatarURL = usuario.avatar_url || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(usuario.username || 'Usuário') + '&background=random&size=128';

  perfilAvatar.src = avatarURL;

  perfilInfo.innerHTML = `
    <h2 style="margin: 0;">${usuario.username || usuario.nome || 'Usuário'}</h2>
    <p style="margin: 2px 0 0 0;"><strong>Email:</strong> ${usuario.email || '—'}</p>
  `;

    document.getElementById('delete-account-btn').onclick = async () => {
        try {
            const res = await fetch(`/api/app_users/${usuario.id}`, { method: 'DELETE' });

            if (res.ok) {
                localStorage.removeItem('usuario');
                window.location.href = '/registro';
            } else {
                const erro = await res.json();
                alert('Erro ao apagar conta: ' + (erro.error || 'Erro desconhecido'));
            }
        } catch (err) {
            alert('Erro ao apagar conta: ' + err.message);
        }
    };

}

document.addEventListener('DOMContentLoaded', () => {
  mostrarPerfilUsuario();

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

function inicializarEventosTarefa() {
  document.querySelectorAll('.editar-tarefa').forEach(btn => {
    btn.addEventListener('click', () => {
      const li = btn.closest('li');
      const id = btn.dataset.id;

      const tituloStrong = li.querySelector('strong');
      const descLine = li.querySelector('.tarefa-descricao');
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

      const salvarBtn = document.createElement('button');
      salvarBtn.className = 'icon-btn';
      salvarBtn.title = 'Salvar';
      salvarBtn.innerHTML = '<i data-feather="check"></i>';

      const excluirBtn = li.querySelector('.excluir-tarefa');
      const descartarBtn = document.createElement('button');
      descartarBtn.className = 'icon-btn';
      descartarBtn.title = 'Descartar alterações';
      descartarBtn.innerHTML = '<i data-feather="x"></i>';
      descartarBtn.style.marginLeft = '10px';

      tituloStrong.replaceWith(inputTitulo);
      descLine.replaceWith(inputDescricao);
      entregaLine.replaceWith(inputDataEntrega);
      statusLine.replaceWith(statusLabel);
      btn.replaceWith(salvarBtn);
      excluirBtn.replaceWith(descartarBtn);

      feather.replace();

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

        carregarTarefas();
      });

      descartarBtn.addEventListener('click', () => {
        inputTitulo.replaceWith(tituloStrong);
        inputDescricao.replaceWith(descLine);
        inputDataEntrega.replaceWith(entregaLine);
        statusLabel.replaceWith(statusLine);
        salvarBtn.replaceWith(btn);
        descartarBtn.replaceWith(excluirBtn);
        feather.replace();
      });
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
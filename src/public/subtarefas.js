function inicializarEventosSubtarefa() {
  // Criar nova subtarefa
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

      const carregarTarefas = window.carregarTarefas || (() => window.location.reload());
      carregarTarefas();
    });
  });

  // Editar subtarefa
  document.querySelectorAll('.editar-sub').forEach(btn => {
    btn.addEventListener('click', () => {
      const subtarefaDiv = btn.closest('.subtarefa');
      const id = btn.dataset.id;

      const titleSpan = subtarefaDiv.querySelector('.subtarefa-title');
      const descSpan = subtarefaDiv.querySelector('.subtarefa-desc');
      const statusDiv = subtarefaDiv.querySelector('.subtarefa-status');
      const excluirBtn = subtarefaDiv.querySelector('.excluir-sub');

      // Criar campos de input
      const inputTitulo = document.createElement('input');
      inputTitulo.value = titleSpan.textContent;

      const inputDescricao = document.createElement('input');
      inputDescricao.value = descSpan.textContent;

      const checkboxConcluido = document.createElement('input');
      checkboxConcluido.type = 'checkbox';
      checkboxConcluido.checked = subtarefaDiv.classList.contains('concluida');

      const labelStatus = document.createElement('label');
      labelStatus.style.display = 'flex';
      labelStatus.style.alignItems = 'center';
      labelStatus.style.gap = '8px';
      labelStatus.innerHTML = 'Status: ';
      labelStatus.appendChild(checkboxConcluido);
      labelStatus.classList.add('subtarefa-status');

      // Criar botão salvar
      const salvarBtn = document.createElement('button');
      salvarBtn.textContent = 'Salvar';

      // Criar botão descartar
      const descartarBtn = document.createElement('button');
      descartarBtn.textContent = '❌ Descartar alterações';
      descartarBtn.style.marginLeft = '10px';

      descartarBtn.addEventListener('click', () => {
        inputTitulo.replaceWith(titleSpan);
        inputDescricao.replaceWith(descSpan);
        labelStatus.replaceWith(statusDiv);
        salvarBtn.replaceWith(btn);
        descartarBtn.replaceWith(excluirBtn);
      });

      salvarBtn.addEventListener('click', async () => {
        await fetch(`/api/subtarefas/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: inputTitulo.value,
            descricao: inputDescricao.value,
            concluido: checkboxConcluido.checked
          })
        });

        window.carregarTarefas();
      });

      // Substituições visuais
      titleSpan.replaceWith(inputTitulo);
      descSpan.replaceWith(inputDescricao);
      statusDiv.replaceWith(labelStatus);
      btn.replaceWith(salvarBtn);
      excluirBtn.replaceWith(descartarBtn);
    });
  });

  // Excluir subtarefa
  document.querySelectorAll('.excluir-sub').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      await fetch(`/api/subtarefas/${id}`, { method: 'DELETE' });
      window.carregarTarefas();
    });
  });
}
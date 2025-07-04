function inicializarEventosSubtarefa() {
  document.querySelectorAll('.subtarefa').forEach(sub => {
    const id = sub.dataset.id;

    const btnEditar = sub.querySelector('.editar-sub');
    const btnExcluir = sub.querySelector('.excluir-sub');

    btnEditar?.addEventListener('click', () => {
      const tituloElem = sub.querySelector('.subtarefa-title');
      const descricaoElem = sub.querySelector('.subtarefa-desc');
      const statusElem = sub.querySelector('.subtarefa-status');
      const statusElemClone = statusElem.cloneNode(true);

      const inputTitulo = document.createElement('input');
      inputTitulo.type = 'text';
      inputTitulo.value = tituloElem.textContent;

      const inputDescricao = document.createElement('input');
      inputDescricao.type = 'text';
      inputDescricao.value = descricaoElem.textContent;

      const checkboxConcluido = document.createElement('input');
      checkboxConcluido.type = 'checkbox';
      checkboxConcluido.checked = statusElem.textContent.includes('Concluído');

      const statusLabel = document.createElement('label');
      statusLabel.style.display = 'block';
      statusLabel.textContent = 'Status: ';
      statusLabel.appendChild(checkboxConcluido);

      const salvarBtn = document.createElement('button');
      salvarBtn.className = 'icon-btn';
      salvarBtn.title = 'Salvar';
      salvarBtn.innerHTML = '<i data-feather="check"></i>';

      const cancelarBtn = document.createElement('button');
      cancelarBtn.className = 'icon-btn';
      cancelarBtn.title = 'Cancelar';
      cancelarBtn.innerHTML = '<i data-feather="x"></i>';
      cancelarBtn.style.marginLeft = '8px';

      tituloElem.replaceWith(inputTitulo);
      descricaoElem.replaceWith(inputDescricao);
      statusElem.replaceWith(statusLabel);

      btnEditar.replaceWith(salvarBtn);
      btnExcluir.replaceWith(cancelarBtn);

      feather.replace();

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

        carregarTarefas();
      });

      cancelarBtn.addEventListener('click', () => {
        inputTitulo.replaceWith(tituloElem);
        inputDescricao.replaceWith(descricaoElem);
        statusLabel.replaceWith(statusElemClone);

        salvarBtn.replaceWith(btnEditar);
        cancelarBtn.replaceWith(btnExcluir);

        feather.replace();
      });
    });

    btnExcluir?.addEventListener('click', async () => {
      await fetch(`/api/subtarefas/${id}`, { method: 'DELETE' });
      carregarTarefas();
    });
  });

  document.querySelectorAll('.subtarefa-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const idTarefa = parseInt(form.dataset.id);
      const formData = new FormData(form);

      const novaSubtarefa = {
        title: formData.get('title'),
        descricao: formData.get('descricao'),
        ordem: 1,
        concluido: false,
        id_tarefa: idTarefa,
      };

      await fetch('/api/subtarefas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaSubtarefa),
      });

      form.reset();
      carregarTarefas();
    });
  });
}
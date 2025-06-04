document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('tarefa-form');
  const tarefasContainer = document.getElementById('tarefas-container');

  async function carregarTarefas() {
    const res = await fetch('/api/tarefas');
    const tarefas = await res.json();

    tarefasContainer.innerHTML = '';
    tarefas.forEach(tarefa => {
      const li = document.createElement('li');
    li.innerHTML = `
        <strong>${tarefa.titulo}</strong><br/>
        ${tarefa.descricao}<br/>
        Criada em: ${new Date(tarefa.data_criada).toLocaleDateString('pt-BR')}<br/>
        Entrega: ${new Date(tarefa.data_de_entrega).toLocaleDateString('pt-BR')}<br/>
        Status: ${tarefa.concluido ? 'Concluído' : 'Pendente'}
  <hr/>
`;

      tarefasContainer.appendChild(li);
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const novaTarefa = {
      titulo: document.getElementById('titulo').value,
      descricao: document.getElementById('descricao').value,
      data_criada: new Date().toISOString().split('T')[0],
      data_de_entrega: document.getElementById('data_de_entrega').value,
      concluido: false,
      id_usuario: parseInt(document.getElementById('id_usuario').value),
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
window.usuario = JSON.parse(localStorage.getItem('usuario'));

if (!window.usuario) {
  window.location.href = '/registro';
}
function salvar(nomeChave, item) {
  localStorage.setItem(nomeChave, JSON.stringify(item));
}

function obter(nomeChave) {
  return JSON.parse(localStorage.getItem(nomeChave));
}

export default {
  salvar,
  obter
}
const button = document.querySelector(".button-add-task");
const input = document.querySelector(".input-task");
const listaCompleta = document.querySelector(".list-tasks");

let minhaListaDeItens = [];

function adicionarNovaTarefa() {
  const valorDigitado = input.value.trim();

  if (valorDigitado === "") {
    alert("Por favor, digite uma tarefa antes de adicionar.");
    return;
  }

  const jaExiste = minhaListaDeItens.some(
    (item) => item.tarefa.toLowerCase() === valorDigitado.toLowerCase()
  );

  if (jaExiste) {
    alert("Essa tarefa já existe na lista.");
    return;
  }

  minhaListaDeItens.push({
    tarefa: valorDigitado,
    concluida: false,
  });

  input.value = "";
  mostrarTarefas();
}

function mostrarTarefas() {
  let novaLi = "";

  minhaListaDeItens.forEach((item, posicao) => {
    novaLi += `
      <li class="task ${item.concluida ? "done" : ""}">
        <img src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
        <p>${item.tarefa}</p>
        <img src="./img/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
      </li>
    `;
  });

  listaCompleta.innerHTML = novaLi;

  localStorage.setItem("lista", JSON.stringify(minhaListaDeItens));
}

function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;
  mostrarTarefas();
}

function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1);
  mostrarTarefas();
}

function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem("lista");

  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
  }

  mostrarTarefas();
}

recarregarTarefas();
button.addEventListener("click", adicionarNovaTarefa);

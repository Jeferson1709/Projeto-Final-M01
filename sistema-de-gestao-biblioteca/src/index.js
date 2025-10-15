// Mantém o loop principal, handlers de opções e utilitários de interface (exibição/entrada).

import Biblioteca from "./services/Biblioteca.js";
import { mostrarMenu, prompt } from "./cli/menu.js";
import chalk from "chalk";

// Instância única do serviço da biblioteca, compartilhada por todo o fluxo.
const biblioteca = new Biblioteca();

// Exibe usuários em uma tabela resumida.
function exibirUsuarios(lista) {
  if (!lista || lista.length === 0) {
    console.log(chalk.yellowBright("\nNenhum usuário cadastrado."));
    return;
  }

  console.log(chalk.magentaBright("\n ===================================== Usuários ======================================="));
  // Mapeia para uma visão compacta, evitando campos não essenciais.
  const tabela = lista.map(u => ({
    id: u.id,
    nome: u.nome,
    cpf: u.cpf || "-",
    email: u.email || "-",
    idade: u.idade ?? "-",
    telefone: u.telefone || "-",
    endereco: u.endereco || "-"
  }));
  console.table(tabela);
}

// Exibe livros em uma tabela resumida, incluindo status e datas.
function exibirLivros(lista) {
  if (!lista || lista.length === 0) {
    console.log(chalk.yellowBright("Nenhum livro cadastrado."));
    return;
  }

  console.log(chalk.magentaBright("\n ================================================== Livros ===================================================="));
  const tabela = lista.map(l => ({
    id: l.id,
    titulo: l.titulo,
    autor: l.autor,
    status: l.status,
    dataAluguel: l.dataAluguel || "-",
    dataDevolucao: l.dataDevolucao || "-"
  }));
  console.table(tabela);
}

// Lê um número via prompt e valida, retornando NaN em caso de entrada inválida.
function promptNumber(mensagem) {
  const raw = prompt(mensagem);
  const n = Number(raw);
  return Number.isFinite(n) ? n : NaN;
}

// Confirmação simples: retorna true apenas se a resposta for 's'/'S'.
function confirmar(mensagem) {
  const r = prompt(`${mensagem} (${chalk.greenBright("s")}/${chalk.redBright("N")})`);
  return !!r && r.trim().toLowerCase() === "s";
}

// Cadastra um novo usuário coletando os dados básicos via prompt.
function handleCadastrarUsuario() {
  try {
    const nome = prompt("Nome");
    const email = prompt("Email");
    const cpf = prompt("CPF");
    const idadeRaw = prompt("Idade");
    const idade = idadeRaw ? Number(idadeRaw) : null;
    const telefone = prompt("Telefone");
    const endereco = prompt("Endereco");
    ;
    // Delegação para o serviço de biblioteca.
    const u = biblioteca.cadastrarUsuario({

      nome,
      cpf,
      email: email || null,
      idade,
      telefone,
      endereco
    });

    console.log(chalk.blackBright(`\n${chalk.yellow(u.nome)} cadastrado com ID:`), chalk.yellow(u.id));
  } catch (error) {
    console.error(chalk.bgRedBright("\nErro ao cadastrar usuário:"), error.message);
  }
}

// Lista todos os usuários cadastrados.
function handleListarUsuarios() {
  try {
    exibirUsuarios(biblioteca.listarUsuarios());
  } catch (error) {
    console.error(chalk.redBright("Erro ao listar usuarios:"), error.message);
  }
}

// Cadastra um novo livro com título e autor.
function handleCadastrarLivro() {
  try {
    const titulo = prompt("Titulo");
    const autor = prompt("Autor");
    const l = biblioteca.cadastrarLivro({ titulo, autor });
    console.log(chalk.blackBright("Livro cadastrado com ID:"), chalk.yellow(l.id));
  } catch (error) {
    console.error(chalk.bgRedBright("Erro ao cadastrar livro:"), error.message);
  }
}

// Lista todos os livros cadastrados.
function handleListarLivros() {
  try {
    exibirLivros(biblioteca.listarLivros());
  } catch (error) {
    console.error(chalk.redBright("Erro ao listar livros:"), error.message);
  }
}

// Aluga um livro para um usuário, validando IDs informados.
function handleAlugarLivro() {
  try {
    const livroId = promptNumber("ID do livro");
    if (isNaN(livroId)) return console.log(chalk.redBright("ID do livro inválido."));

    const usuarioId = promptNumber("ID do usuario");
    if (isNaN(usuarioId)) return console.log(chalk.redBright("ID do usuario invalido."));

    // Serviço realiza regras de negócio.
    const l = biblioteca.alugarLivro(livroId, usuarioId);
    console.log(chalk.blackBright("Livro alugado:"), chalk.yellow(l.titulo), chalk.blackBright("-> usuario"), chalk.yellow(l.alugadoPor));
  } catch (error) {
    console.error(chalk.red("Erro ao alugar livro:", error.message));
  }
}

// Devolve um livro alugado, liberando-o para novos empréstimos.
function handleDevolverLivro() {
  try {
    const livroId = promptNumber("ID do livro");
    if (isNaN(livroId)) return console.log(chalk.redBright("ID do livro invalido."));

    const l = biblioteca.devolverLivro(livroId);
    console.log(chalk.greenBright("Livro devolvido:"), chalk.yellow(l.titulo));
  } catch (error) {
    console.error(chalk.redBright("Erro ao devolver livro:"), error.message);
  }
}

// Busca livros por título e exibe resultados.
function handleBuscarLivro() {
  try {
    const titulo = prompt("Titulo do Livro");
    const resultados = biblioteca.buscarLivroPorTitulo(titulo);
    exibirLivros(resultados);
  } catch (error) {
    console.error(chalk.redBright("Erro na busca:"), error.message);
  }
}

// Remove um usuário após confirmação explícita.
function handleRemoverUsuario() {
  try {
    const id = promptNumber("ID do usuario a ser removido");
    if (isNaN(id)) return console.log(chalk.red("ID invalido."));

    if (!confirmar(chalk.blackBright(`Confirma remocao do Usuario ${chalk.yellow(id)} ?`))) {
      console.log(chalk.greenBright("Remocao cancelada."));
      return;
    }

    const removido = biblioteca.removerUsuario(id);
    console.log("Usuario removido:", removido.id, removido.nome);
  } catch (error) {
    console.error(chalk.redBright("Erro ao remover usuario:"), error.message);
  }
}

// Remove um livro após confirmação explícita.
function handleRemoverLivro() {
  try {
    const id = promptNumber("ID do livro a ser removido");
    if (isNaN(id)) return console.log(chalk.red("ID invalido."));

    if (!confirmar(chalk.blackBright(`Confirma remocao do livro ${chalk.yellow(id)} ?`))) {
      console.log(chalk.greenBright("Remocao cancelada!"));
      return;
    }

    const removido = biblioteca.removerLivro(id);
    console.log(chalk.bgGreen("\nLivro removido:"), chalk.yellow(removido.id, removido.titulo));
  } catch (error) {
    console.error(chalk.redBright("Erro ao remover livro:"), error.message);
  }
}



// Loop principal do CLI: mostra o menu, despacha para o handler correspondente
// e trata erros inesperados para não encerrar a aplicação.
async function mainLoop() {
  while (true) {
    try {
      const opt = mostrarMenu();

      switch (opt) {
        case "1":
          handleCadastrarUsuario();
          break;
        case "2":
          handleListarUsuarios();
          break;
        case "3":
          handleCadastrarLivro();
          break;
        case "4":
          handleListarLivros();
          break;
        case "5":
          handleAlugarLivro();
          break;
        case "6":
          handleDevolverLivro();
          break;
        case "7":
          handleBuscarLivro();
          break;
        case "8":
          handleRemoverUsuario();
          break;
        case "9":
          handleRemoverLivro();
          break;
        case "0":
          console.log(chalk.bgYellowBright("Saindo..."));
          process.exit(0);
        default:
          console.log(chalk.redBright("\nOpção inválida!"));
      }
    } catch (e) {
      console.error(chalk.redBright("Erro inesperado:", e.message));
    }
  }
}


// Reinicia o estado da biblioteca e popula com dados de exemplo para testes.
function seedDados() {
  // Limpa estado interno.
  biblioteca.livros = [];
  biblioteca.usuarios = [];



  // Conjuntos de teste para facilitar a navegação inicial.
  const livrosTeste = [
    { titulo: "Dom Casmurro", autor: "Machado de Assis" },
    { titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien" },
    { titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry" },
    { titulo: "1984", autor: "George Orwell" }
  ];

 
  const usuarioTeste = [
    { nome: "Jeferson Alves Santos", cpf: "000.000.000-00", email: "jeferson@teste.com", idade: 21, telefone: "11 99999-9999", endereco: "Progradores do amanhã" },
    { nome: "Rodrigo Barros Souza", cpf: "000.000.000-00", email: "rodrigo@teste.com",idade: 23 ,telefone: "11 99999-9999", endereco: "Progradores do amanhã" } ,
    { nome: "Beatriz Nunes de Deus", cpf: "000.000.000-00", email: "beatriz@teste.com", idade: 20,  telefone: "11 99999-9999", endereco: "Progradores do amanhã" },
    { nome: "Vitória Queiroz Família", cpf: "000.000.000-00", email: "vitoria@teste.com", idade: 20, telefone: "11 99999-9999", endereco: "Progradores do amanhã" },
    { nome: "Breno Araujo Melo", cpf: "000.000.000-00", email: "breno@teste.com", idade: 20,telefone: "11 99999-9999", endereco: "Progradores do amanhã" },
    { nome: "Agda Barbosa de Oliveira", cpf: "000.000.000-00", email: "agda@teste.com", idade: 20,telefone: "11 99999-9999", endereco: "Progradores do amanhã" },
    { nome: "Clara Gabrielle Silva Roosenvelt", cpf: "000.000.000-00", email: "clara@teste.com", idade: 20,telefone: "11 99999-9999", endereco: "Progradores do amanhã" },
  ];

  // Cadastra os dados de exemplo.
  usuarioTeste.forEach(u => biblioteca.cadastrarUsuario(u));
  livrosTeste.forEach(l => biblioteca.cadastrarLivro(l));
}

// Popula dados base e inicia o loop do CLI.
seedDados();
mainLoop();

// Importando o módulo 'readline-sync' para permitir a leitura de entradas do usuário via terminal.
import readlineSync from "readline-sync";
import chalk from "chalk";

// Função responsável por exibir o menu principal do sistema de biblioteca.
// Essa função será exportada para ser utilizada em outro arquivo.
export function mostrarMenu() {

  // Exibe as opções do menu no console.
  console.log(chalk.bgGray.white("\n======  SISTEMA BIBLIOTECA  ======"));
  console.log(chalk.yellowBright("==="+chalk.black("(1) Cadastrar usuário      )")+"==="));
  console.log(chalk.yellowBright("==="+chalk.black("(2) Listar usuários        )")+"==="));
  console.log(chalk.yellowBright("==="+chalk.black("(3) Cadastrar livro        )")+"==="));
  console.log(chalk.yellowBright("==="+chalk.black("(4) Listar livros          )")+"==="));
  console.log(chalk.yellowBright("==="+chalk.black("(5) Alugar livro           )")+"==="));
  console.log(chalk.yellowBright("==="+chalk.black("(6) Devolver livro         )")+"==="));
  console.log(chalk.yellowBright("==="+chalk.black("(7) Buscar livro por título)")+"==="));
  console.log(chalk.yellowBright("==="+chalk.black("(8) Remover usuário        )")+"==="));
  console.log(chalk.yellowBright("==="+chalk.black("(9) Remover livro          )")+"==="));
  console.log(chalk.yellowBright("==="+chalk.black("(0) Sair                   )")+"==="));

  // Lê a opção digitada pelo usuário e armazena na variável 'opt'.
  const opt = readlineSync.question(chalk.yellow("Escolha uma Opcao: "));

  // Retorna a resposta digitada, removendo possíveis espaços em branco no início ou final.
  return opt.trim();
}


// Função auxiliar que exibe uma pergunta e retorna a resposta do usuário.
// Essa função também será exportada para ser usada em outros arquivos.
export function prompt(campo) {

  // Exibe a pergunta com o nome do campo e guarda a resposta digitada pelo usuário.
  const resp = readlineSync.question(`${chalk.yellow(campo)}: `);

  // Retorna a resposta removendo espaços extras.
  return resp.trim();
}
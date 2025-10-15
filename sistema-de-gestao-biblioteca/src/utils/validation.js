import chalk, { Chalk } from "chalk";

// Função para validar se uma string não está vazia.
export function validarStringNaoVazia(valor, campo) {
  // Garante que o valor seja uma string (evita erro ao chamar .trim() em undefined/null)
  const texto = String(valor || "").trim();

 

  // Verifica se o campo está vazio
  if (!texto) {
    throw new Error(chalk.blackBright(`O campo ${chalk.red(campo)} deve ser preenchido.`));
  }

  // Verifica se contém algum número
  if (/\d/.test(texto)) {
    throw new Error(chalk.blackBright(`O campo ${chalk.yellowBright(campo)} não pode conter números.`));
  }

  // Retorna o valor limpo (sem espaços extras)
  return texto;
}

// Função para validar se uma string não está vazia.
export function validarStringNaoVaziaTitulo(valor, campo) {
  // Garante que o valor seja uma string (evita erro ao chamar .trim() em undefined/null)
  const texto = String(valor || "").trim();

  // Verifica se o campo está vazio
  if (!texto) {
    throw new Error(chalk.blackBright(`\nO campo ${chalk.yellow(campo)} deve ser preenchido.`));
  }

  // Retorna o valor limpo (sem espaços extras)
  return texto;
}
// Função para validar se uma string não está vazia.
export function validarStringNaoVaziaEmail(valor, campo) {
  // Garante que o valor seja uma string (evita erro ao chamar .trim() em undefined/null)
  const texto = String(valor || "").trim();

  // Verifica se o campo está vazio
  if (!texto) {
    throw new Error(chalk.blackBright(`\nO campo ${chalk.yellow(campo)} deve ser preenchido.`));
  }

  // Retorna o valor limpo (sem espaços extras)
  return texto;
}

// Função para validar o formato de um e-mail.
export function validarEmail(email) {
  // Primeiro verifica se o e-mail não está vazio.
  validarStringNaoVaziaEmail(email, "Email");

  // Expressão regular que valida o formato de e-mail padrão (ex: nome@dominio.com).
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Caso o e-mail não corresponda ao formato esperado, lança um erro.
  if (!re.test(email)) throw new Error(chalk.blackBright(`Ops! Parece que o e-mail digitado está incorreto. Confira o formato ${chalk.yellow("(ex: nome@exemplo.com).")}`));
}

// Função para validar o formato de um telefone.
export function validarTelefone(telefone) {
  // Primeiro verifica se o telefone foi informado.
  if (!telefone || telefone === "" ) {
    throw new Error(chalk.blackBright("É necessário digitar o telefone. "));
  }

  // Expressão regular que valida números de telefone com DDD e traço (ex: (11) 91234-5678).
  const re = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

  // Caso o telefone não siga o formato correto, lança um erro.
  if (!re.test(telefone)) throw new Error(chalk.blackBright(`Telefone inválido, informe de acordo com o formato: ${chalk.yellow("(11) xxxxx-xxxx!")}`));
}

// Função para validar se a idade é um número dentro de um intervalo aceitável.
export function idadeValida(idade) {
  // Verifica se a idade é um número válido e está entre 1 e 120.
  if (isNaN(idade) || idade <= 0 || idade >= 120) {
    // Caso não seja, lança um erro informando o intervalo correto.
    throw new Error(chalk.blackBright(`Idade inválida! Digite um número entre ${chalk.yellow("(1 e 120)")}.`));
  }
}




export function validaDocumento(documento) {
  if (!documento || documento.trim() === "") {
    throw new Error(chalk.blackBright("Documento é obrigatório."));
  }

  // Remove espaços e caracteres especiais
  const docLimpo = documento.replace(/[.\-]/g, "").trim();

  // Verifica se contém exatamente 11 números
  if (!/^\d{11}$/.test(docLimpo)) {
    throw new Error(
      chalk.blackBright(
        `Documento deve conter exatamente ${chalk.yellow("11 números")}, sem letras ou sinais.`
      )
    );
  }

  // Verifica se segue o formato válido (com ou sem pontuação)
  const regex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
  if (!regex.test(documento)) {
    throw new Error(
      chalk.blackBright(
        `CPF inválido. Digite no formato ${chalk.yellow("000.000.000-00")} ou apenas números.`
      )
    );
  }

}

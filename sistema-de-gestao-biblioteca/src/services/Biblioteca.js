// Biblioteca de manipulação de arquivos e gestão de regras de negócio.
import fs from 'fs';
import path from 'path';

// Importa a classe Livro para criar instâncias de livro.
import Livro from "../models/Livro.js";

// Importa validadores utilitários para checar strings e e-mails.
import { validarStringNaoVazia, validarEmail, validarTelefone, idadeValida, validarStringNaoVaziaTitulo, validaDocumento } from "../utils/validation.js";
import chalk from 'chalk';

// Classe principal que encapsula a lógica da biblioteca:
export default class Biblioteca {

  // Construtor recebe um objeto opcional com dbPath para alterar o local do arquivo.
  constructor({ dbPath } = {}) {
    // Arrays que guardam os dados em memória.
    this.usuarios = [];
    this.livros = [];

    // Contador de ids para gerar identificadores únicos.
    this._idCounter = 1;

    // Diretório padrão onde ficará o arquivo de banco.
    this._dbDir = path.resolve(process.cwd(), 'database');

    // Caminho completo do arquivo de banco; permite override por dbPath.
    this._dbPath = dbPath ? path.resolve(dbPath) : path.join(this._dbDir, 'db.json');

    // Ao criar a instância tentamos carregar dados já salvos.
    this._carregar();
  }

  // Limpa as informações do container
  _limparTudo() {
    this.usuarios = [];
    this.livros = [];
    this._idCounter = 1;
    this._salvar();
  }

  // Persiste o estado atual em JSON no disco.
  _salvar() {
    try {
      // Garante que o diretório exista antes de escrever o arquivo.
      if (!fs.existsSync(this._dbDir)) fs.mkdirSync(this._dbDir, { recursive: true });

      // Constrói o "dump" que será gravado como JSON.
      const dump = {
        idCounter: this._idCounter,
        usuarios: this.usuarios,
        livros: this.livros
      };

      // Escreve o arquivo com espaçamento para facilitar leitura.
      fs.writeFileSync(this._dbPath, JSON.stringify(dump, null, 2), 'utf-8');

    } catch (err) {
      // Em caso de erro apenas logamos a mensagem.
      console.error('Falha ao salvar dados:', err.message);
    }
  }

  // Carrega o arquivo JSON e restaura estado interno.
  _carregar() {
    try {
      // Se o arquivo não existe, nada a fazer.
      if (!fs.existsSync(this._dbPath)) return;

      // Lê o arquivo e interpreta o JSON.
      const raw = fs.readFileSync(this._dbPath, 'utf-8');
      const parsed = JSON.parse(raw);

      // Restaura o contador de id.
      this._idCounter = parsed.idCounter ? parsed.idCounter : 1;

      // Restaura usuários e livros. Para livros, recriamos instâncias de Livro
      // Usuários são mantidos como objetos plain para persistência simples.
      this.usuarios = (parsed.usuarios || []).map(u => u);
      this.livros = (parsed.livros || []).map(l => new Livro(l));
    } catch (err) {
      // Logamos problemas na leitura/parsing do DB.
      console.error('Falha ao carregar DB:', err.message);
    }
  }

  // Cadastrar um usuário novo.
  cadastrarUsuario({ nome, email, idade = null, telefone, endereco, cpf }) {
    // garante que o contador exista
    if (typeof this._idCounter !== 'number' || this._idCounter < 1) this._idCounter = 1;

    // Validações
    validarStringNaoVazia(nome, "Nome");
    if (idade) idadeValida(idade);
    if (email) validarEmail(email);
    if (telefone) validarTelefone(telefone);
    if (cpf) validaDocumento(cpf);

    // Verifica unicidade do email (case-insensitive)
    if (email && this.usuarios.find(u => String(u.email || "").toLowerCase() === String(email).toLowerCase())) {
      throw new Error(chalk.blackBright("Já existe usuário com esse email."));
    }

    // Gera o id a partir do contador persistido.
    const id = this._idCounter++;


    const UsuarioClass = awaitImportUsuario();
    const usuario = new UsuarioClass({ id, nome, email, idade, telefone, endereco, cpf });

    // Persistencia com data de criação.
    const usuarioPlain = {
      id: usuario.id,
      nome: usuario.nome,
      cpf: usuario.cpf,
      email: usuario.email,
      idade: usuario.idade,
      telefone: usuario.telefone,
      endereco: usuario.endereco,
      dataDeCriacao: (new Date()).toLocaleDateString("pt-BR")
    };

    this.usuarios.push(usuarioPlain);
    this._salvar();

    return usuarioPlain;
  }

  // Retorna cópia do array de usuários 
  listarUsuarios() {
    return [...this.usuarios];
  }

  // Busca usuário por id.
  buscarUsuario(id) {
    const idNum = Number(id);
    return this.usuarios.find(u => u.id === idNum) || null;
  }

  // Cadastra um novo livro com título e autor (ambos obrigatórios).
  cadastrarLivro({ titulo, autor }) {
    const id = this._idCounter++;
    // Validações básicas de campos de texto.
    validarStringNaoVaziaTitulo(titulo, "Título");
    validarStringNaoVazia(autor, "Autor");

    // Cria nova instância do modelo Livro.
    const livro = new Livro({ id: id, titulo, autor });

    // Armazenamos objeto plain com campos relevantes para facilitar serialização.
    const livroPlain = { id: livro.id, titulo: livro.titulo, autor: livro.autor, alugadoPor: livro.alugadoPor, status: livro.status, dataDeCriacao: livro.dataDeCriacao.toLocaleDateString("pt-BR") };

    // Adiciona ao array e persiste.
    this.livros.push(livroPlain);
    this._salvar();

    // Retorna o livro salvo.
    return livroPlain;
  }

  // Lista livros.
  listarLivros() {
    return [...this.livros];
  }

  // Busca livro por id.
  buscarLivro(id) {
    const idNum = Number(id);
    return this.livros.find(l => l.id === idNum) || null;
  }

  // Busca livros cujo título contenha a keyword (busca case-insensitive).

  buscarLivroPorTitulo(titulo) {
    if (!titulo || String(titulo).trim().length === 0) return [];
    return this.livros.filter(l => String(l.titulo).toLowerCase().includes(String(titulo).toLowerCase()));
  }

  // Aluga um livro para um usuário:
  alugarLivro(livroId, usuarioId) {
    // cria a data de hoje
    const hoje = new Date();
    // cria uma nova data baseada na de hoje  
    const devolucao = new Date(hoje);
    // adiciona 7 dias de aluguel 
    devolucao.setDate(hoje.getDate() + 7);
    const livro = this.buscarLivro(livroId);

    if (!livro) throw new Error(chalk.blackBright("Livro não encontrado."));
    const usuario = this.buscarUsuario(usuarioId);
    if (!usuario) throw new Error(chalk.blackBright("Usuário não encontrado."));
    if (livro.status === 'alugado') throw new Error(chalk.blackBright('Livro já está alugado.'));

    // Atualiza estado do livro e persiste.
    livro.status = 'alugado';
    livro.alugadoPor = usuario.id;
    livro.dataAluguel = hoje.toLocaleDateString("pt-BR");// registra a data do aluguel
    livro.dataDevolucao = devolucao.toLocaleDateString("pt-BR");// registra a data de devolução
    this._salvar();
    return livro;
  }

  // Devolve um livro:
  devolverLivro(livroId) {
    const livro = this.buscarLivro(livroId);
    if (!livro) throw new Error(chalk.blackBright("Livro não encontrado."));
    if (livro.status === 'disponível') throw new Error(chalk.blackBright('Livro não está alugado.'));

    livro.status = 'disponível';
    livro.alugadoPor = null;
    livro.dataAluguel = null;
    livro.dataDevolucao = null;
    this._salvar();
    return livro;
  }

  // Remove um usuário pelo id.
  removerUsuario(id) {
    const idNum = Number(id);
    const idx = this.usuarios.findIndex(u => u.id === idNum);
    if (idx === -1) throw new Error(chalk.blackBright('Usuário não encontrado.'));

    // Verifica se existe algum livro alugado por esse usuário.
    const possuiAlugados = this.livros.some(l => l.alugadoPor === idNum && l.status === 'alugado');
    if (possuiAlugados) throw new Error(chalk.blackBright('Não é possível remover usuário: existem livros alugados por ele.'));

    const [removido] = this.usuarios.splice(idx, 1);
    this._salvar();
    return removido;
  }

  // Remove um livro pelo id.
  removerLivro(id) {
    const idNum = Number(id);
    const idx = this.livros.findIndex(l => l.id === idNum);
    if (idx === -1) throw new Error(chalk.blackBright('Livro não encontrado.'));

    const livro = this.livros[idx];
    if (livro.status === 'alugado') throw new Error(chalk.blackBright('Não é possível remover livro: ele está alugado.'));

    const [removido] = this.livros.splice(idx, 1);
    this._salvar();
    return removido;
  }
}

// Função utilitária local que retorna uma classe simples de Usuário.
function awaitImportUsuario() {

  // Retorna a definição da classe Usuário (leve, com createdAt).
  return class {
    constructor({ id, nome, email = null, cpf, idade = null, telefone, endereco }) {
      this.id = id;
      this.nome = nome;
      this.email = email;
      this.cpf = cpf;
      this.idade = idade;
      this.telefone = telefone;
      this.endereco = endereco;
      // Marca a data de criação da instância no mesmo formato dos livros.
      this.dataDeCriacao = new Date().toLocaleDateString("pt-BR");
    }
  }
}
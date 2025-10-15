// Classe Livro exportada para ser usada em outras partes do sistema (ex: Biblioteca.js, index.js).
export default class Livro {
  
  // Construtor da classe que inicializa as propriedades do livro.
  constructor({ id, titulo, autor, alugadoPor = null, status = "disponível", dataDeCriacao = null }) {
    
    // Identificador único do livro.
    this.id = id;
    
    // Título do livro.
    this.titulo = titulo;
    
    // Nome do autor do livro.
    this.autor = autor;
    
    // Identifica quem alugou o livro (guarda o ID do usuário). 
    // Se não houver ninguém, mostra "disponível".
    this.alugadoPor = alugadoPor || "disponível";
    
    // Define o status atual do livro ("disponível" ou "alugado").
    this.status = status;
    
    this.dataAluguel;
    this.dataDevolucao;
    // Data em que o livro foi criado/adicionado.
    // Se já existir uma data (por exemplo, ao carregar de um banco de dados), converte para Date.
    // Caso contrário, cria uma nova data com o momento atual.
    this.dataDeCriacao = dataDeCriacao ? new Date(dataDeCriacao) : new Date();
  }

  // Método responsável por alugar o livro para um usuário.
  // Recebe o ID do usuário como parâmetro.
  alugarLivro(usuarioId) {
    // Verifica se o livro já está alugado. Caso sim, lança um erro.
    if (this.status === "alugado") throw new Error("Livro já está alugado.");
    
    // Atualiza o status para "alugado".
    this.status = "alugado";
    
    // Guarda o ID do usuário que alugou o livro.
    this.alugadoPor = usuarioId;
  }

  // Método responsável por devolver o livro.
  devolverLivro() {
    // Verifica se o livro já está disponível.
    // Se estiver, significa que não foi alugado — lança um erro.
    if (this.status === "disponível") throw new Error("Livro não está alugado.");
    
    // Atualiza o status para "disponível".
    this.status = "disponível";
    
    // Remove a informação de quem alugou o livro.
    this.alugadoPor = null;
  }
}
// Classe Cliente representa os usuários do sistema de biblioteca.
export default class Cliente {

  // Construtor da classe que inicializa os atributos de um cliente.
  // Recebe um objeto com os dados do cliente.
  constructor({ id, nome, email = null, idade = null, telefone, endereco, documento }) {
    
    // Identificador único do cliente.
    this.id = id;
    
    // Nome completo do cliente.
    this.nome = nome;
  

    this.documento = documento;
    // E-mail do cliente. Pode ser nulo caso não seja informado.
    this.email = email;
    
    // Idade do cliente. Pode ser nula caso não seja informada.
    this.idade = idade;
    
    // Telefone de contato do cliente.
    this.telefone = telefone;
    
    // Endereço do cliente.
    this.endereco = endereco;
    
    // Data de criação do registro do cliente (definida no momento em que o cliente é criado).
    this.createdAt = new Date().toLocaleDateString("pt-BR");
    
  }
}
# Sistema de Biblioteca — CLI para Aluguel de Livros

Aplicação CLI em Node.js para cadastrar usuários e livros, realizar aluguel e devolução, com persistência simples em JSON e testes automatizados via runner nativo do Node.

## Requisitos
- Node.js 18+ (recomendado 20+)
- npm 9+

## Instalação
1. Clone o repositório e acesse a pasta do projeto.
2. Execute: npm install.

## Como executar
- npm start — inicia o CLI interativo.
- npm test — executa a suíte de testes com node --test.

## Persistência dos dados
- Os dados são salvos automaticamente em ./src/database/db.json a cada operação (cadastro, aluguel, devolução).
- Estrutura básica do arquivo:
  json
  {
    "idCounter": 5,
    "usuarios": [ /* ... */ ],
    "livros": [ /* ... */ ]
  }
  
- Para limpar, remova o arquivo src/database/db.json.

## Estrutura do projeto

.
├─ src/
│  ├─ cli/               # Menu e prompts do CLI
│  ├─ database/          # db.json (persistência em JSON)
│  ├─ models/            # Modelos: Usuario, Livro
│  ├─ services/
│  │  └─ Biblioteca.js   # Regras de negócio e persistência
│  ├─ utils/
│  │  └─ validation.js   # Validações reutilizáveis
│  └─ index.js           # Ponto de entrada do CLI
├─ test/                 # Testes automatizados (node --test)
├─ package.json
└─ README.md


## Testes
- Execute: npm test.
- A suíte cria uma instância de Biblioteca com arquivo temporário e valida CRUD de usuários/livros e fluxo de aluguel/devolução.



## Squad / Autores

### [Jeferson Araújo](https://github.com/Jeferson1709)



### [Beatriz Nunes](https://github.com/beatriznunes-dev)



### [Rodrigo Barros](https://github.com/Rodrigo0e)



### [Clara Roosenvelt](https://github.com/ClaraDevHub)



### [Breno Araújo](https://github.com/Breno4raujo)



### [Agda Oliveira](github.com/agdaoliveira27)



### [Vitória Família](https://github.com/VitoriaFamilia)


## Tecnologias Utilizadas
- Node.js: Plataforma usada para executar o JavaScript no servidor.
- Chalk: Biblioteca para estilizar e colorir textos no terminal.
- Readline / Readline-Sync:	Utilizadas para entrada de dados via terminal.
- Módulos nativos do Node (fs, path)	Manipulação de arquivos e diretórios.
- ES Modules (import/export):	Estrutura moderna de modularização do JavaScript.


## Como executar o projeto

Clone o repositório

git clone https://github.com/Jeferson1709/Projeto-Final-M01.git

Acesse a pasta do projeto

cd sistema-de-gestao-biblioteca


Instale as dependências

npm install


Execute o sistema

node index.js

## Funcionalidades 

- Cadastrar usuário
- Listar usuários
- Cadastrar livro
- Listar livros
- Alugar livro
- Devolver Livro
- Buscar livro por título
- Remover usuário
- Remover livro
- sair

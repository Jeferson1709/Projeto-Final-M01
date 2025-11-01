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

### .
### ├─ src/
### │  ├─ cli/               # Menu e prompts do CLI
### │  ├─ database/          # db.json (persistência em JSON)
### │  ├─ models/            # Modelos: Usuario, Livro
### │  ├─ services/
### │  │  └─ Biblioteca.js   # Regras de negócio e persistência
### │  ├─ utils/
### │  │  └─ validation.js   # Validações reutilizáveis
### │  └─ index.js           # Ponto de entrada do CLI
### ├─ test/                 # Testes automatizados (node --test)
### ├─ package.json
### └─ README.md


## Testes
- Execute: npm test.
- A suíte cria uma instância de Biblioteca com arquivo temporário e valida CRUD de usuários/livros e fluxo de aluguel/devolução.


## Squad / Autores

| Foto | Nome | Função | Git Hub |
|------|------|---------|-----------|
| <img width="80" height="80" alt="image" src="https://github.com/user-attachments/assets/8a0980b6-e489-4560-b160-725ae2472d2a" />| **Jeferson Alves** | Liderança | [🔗 Github](https://github.com/Jeferson1709) |
| <img width="80" height="80" alt="image" src="https://github.com/user-attachments/assets/c73da9b2-0d2a-443a-ba92-1a1eeb6e3471" /> | **Beatriz Nunes** | Desenvolvedora | [🔗 Github](https://github.com/beatriznunes-dev) |
| <img width="80" height="80" alt="image" src="https://github.com/user-attachments/assets/b8f4a0b9-168e-4755-a931-2fdf2b6581ad" /> | **Breno Araujo** | Desenvolvedor | [🔗 Github](https://github.com/Breno4raujo) |
| <img width="80" height="80" alt="image" src="https://github.com/user-attachments/assets/52177de3-fb02-4b73-99cc-bb9e2f87d1eb" /> | **Clara Roosenvelt** | Desenvolvedora | [🔗 Github](https://github.com/ClaraDevHub) |
| <img width="80" height="80" alt="image" src="https://github.com/user-attachments/assets/8d3706df-626d-4ca2-b204-818cbb82fc1d" />c| **Rodrigo Barros** | Desenvolvedor | [🔗 Github](https://github.com/Rodrigo0e) |
| <img width="80" height="80" alt="image" src="https://github.com/user-attachments/assets/d5be98d7-b681-41ae-a123-6bac42da4d93" /> | **Agda Oliveira** | Desenvolvedora | [🔗 Github](https://github.com/agdaoliveira27) |
| <img width="80" height="80" alt="image" src="https://github.com/user-attachments/assets/30328f02-5d82-4987-8bd6-7e09d4f91727" /> | **Vitória Família** | Desenvolvedora | [🔗 Github](https://github.com/VitoriaFamilia) |

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

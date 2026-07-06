# A ideia do projeto:
Para o projeto final do processo de Trainee de 2026, escolhemos fazer um sistema para fazer o log de exercicios de academia. A ideia é permitir que o usuário crie um treino e gerencie os exercicios a serem realizados.

# Tecnologias:
Para isso, utilizamos:
  No Frontend:
    Vite (React + TypeScript)
    Shadcn UI;
    Tailwind.
    
  E no Backend:
    Prisma;
    Fastify;
    Node.
    
# Passo a passo de uso:
Pré-requisitos:

Antes de iniciar, certifique-se de ter instalado:

Node.js (versão 18 ou superior)
npm
Git

## 1. Clonar o repositório
git clone 
cd 

## 2. Instalar as dependências

Instale as dependências do frontend e do backend:

npm install

## 3. Configurar o banco de dados

Execute as migrações do Prisma para criar o banco SQLite:

npx prisma migrate dev

Caso seja necessário gerar o cliente Prisma novamente:

npx prisma generate

## 4. Iniciar o backend

Execute o servidor Fastify:

npm run dev

O backend ficará disponível em:

http://localhost:3333

## 5. Iniciar o frontend

Abra um novo terminal e execute:

npm run dev

O frontend ficará disponível em:

http://localhost:5173

## Como utilizar? 
Acesse a aplicação pelo navegador.
Clique em Novo Exercício para cadastrar um exercício.
Preencha o nome, as repetições e o tempo de descanso.
Clique em Salvar para registrar o exercício.
Na tela principal é possível:
Visualizar os exercícios cadastrados;
Pesquisar exercícios pelo campo de busca;
Editar informações de um exercício;
Excluir exercícios da lista.

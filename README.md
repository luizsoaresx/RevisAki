# RevisAki

RevisAki é um aplicativo mobile de flashcards desenvolvido para ajudar estudantes a memorizar e revisar conteúdos de forma prática e eficiente, utilizando a técnica de repetição espaçada.

## Sumário

* [Funcionalidades](#funcionalidades)
* [Tecnologias Utilizadas](#tecnologias-utilizadas)
* [Instalação](#instalação)
* [Como Usar](#como-usar)
* [Telas](#telas)
* [Colaboradores](#colaboradores)


## Funcionalidades 

* **Gerenciamento de Usuários**
    * Cadastro e autenticação de usuários para acesso seguro.
    * Possibilidade de alterar a senha do usuário cadastrado.
    * Funcionalidade de logout para encerramento da sessão.

* **Organização de Decks (Pastas)**
    * Criação de decks (pastas) para categorizar seus flashcards por assunto ou tema.
    * Visualização clara dos decks criados.
    * Opções de exclusão e edição de decks.

* **Controle de Flashcards:**
    * Criação de flashcards personalizados.
    * Visualização dos flashcards existentes.
    * Opções de exclusão e edição de flashcards.

* **Revisão Inteligente:**
    * Sistema de revisão de flashcards utilizando a técnica de repetição espaçada, otimizando seu aprendizado e memorização.

## Tecnologias Utilizadas

* **React Native:** Framework para desenvolvimento de aplicativos móveis multiplataforma.
* **Expo Go:** Ferramenta para prototipagem e desenvolvimento rápido com React Native.
* **Expo SQLite:** Biblioteca para gerenciamento de banco de dados SQLite local no aplicativo.

## Instalação
Para rodar o RevisAki localmente, siga os passos abaixo:

**1. Pré-requisitos:**
   * Garanta que você tenha o Node.js e o npm (ou Yarn) instalados em sua máquina.
   * Instale o aplicativo Expo Go em seu dispositivo móvel (Android ou iOS).

**2. Clonar o Repositório:**
```
git clone https://github.com/SEU_USUARIO/RevisAki.git # Substitua SEU_USUARIO pelo seu usuário do GitHub

cd revisaki
```

**3. Instalar Dependências:**
```
npm install
# ou
yarn install
```

**4. Executar o Projeto:**
```
npx expo start
```

## Como usar

Depois de instalar e abrir o RevisAki, você estará pronto para começar a estudar:

**1. Crie sua Conta e Faça Login:**

  * Na primeira vez, cadastre-se. Depois, é só fazer login.

**2. Organize com Decks (Pastas):**

  * Crie decks para organizar seus flashcards por matéria ou tema (ex: "Português", "Química").
  * Você pode ver, editar e excluir seus decks.

**3. Adicione Flashcards:**

  * Dentro de um deck, crie seus flashcards. Digite a pergunta e a resposta.
  * Você também pode ver, editar e excluir flashcards.

**4. Comece a Revisar:**

  * Clique para começar uma revisão. O app mostrará um flashcard por vez.
  * Depois de ver a resposta, diga se acertou ou errou. Isso ajuda o RevisAki a te mostrar quantas questões você acertou.

**5. Gerencie sua Conta:**

  * Nas configurações, você pode mudar sua senha ou sair do aplicativo.

## Telas
<div align="center">
   <img src="https://github.com/user-attachments/assets/042721c6-28d5-4c22-af3a-cfe1ce84ba10" alt="Welcome Screen" width="32%"/>
   <img src="https://github.com/user-attachments/assets/ff750f15-07b3-4dfd-a7e3-1d01a62721e1" alt="Login Screen" width="32%"/>
   <img src="https://github.com/user-attachments/assets/af9ce21d-4e55-4c87-84f4-ad94fc7435b1" alt="Register Screen" width="32%"/>
</div>

<div align="center">
   <img src="https://github.com/user-attachments/assets/a5905139-98ab-4aba-9c72-8c819e368fea" alt="Home Screen" width="32%"/>
   <img src="https://github.com/user-attachments/assets/6f76978c-636c-4eb1-8bac-61b1d3e39a81" alt="Deck Screen" width="32%"/>
   <img src="https://github.com/user-attachments/assets/68cc210e-3447-4731-a1a6-0df6e3602094" alt="Flashcard Screen" width="32%"/>
</div>

<div align="center">
   <img src="https://github.com/user-attachments/assets/c64ae718-efd7-4bcc-8aa8-e634844901b7" alt="New Flashcard Screen" width="32%"/>
   <img src="https://github.com/user-attachments/assets/82cfd9f4-f28e-4364-8aaf-a71c8e5623c5" alt="Revision Screen" width="32%"/>
   <img src="https://github.com/user-attachments/assets/576b6baa-954e-4b35-8f8a-234d896c33e8" alt="Profile Screen" width="32%"/>
</div>

## Colaboradores
* Bruna Bezerra
* Dominique Morem
* Laura Gomes
* Lucas Daniel Bezerra
* Luiz Lobato

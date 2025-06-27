# Taskly - Aplicativo de Gerenciamento de Tarefas com React Native

<p align="center">
  <img alt="Prévia do Taskly" src="https://github.com/JoaoVicttor07/RN-MAR25-taskly/assets/160889212/8204b127-b644-42f8-bf75-680c43ca3f0f" width="800px">
</p>

<p align="center">
  <img alt="Versão do React Native" src="https://img.shields.io/badge/React%20Native-0.79.1-61DAFB?logo=react&logoColor=black">
  <img alt="Linguagem" src="https://img.shields.io/badge/TypeScript-4.8.4-3178C6?logo=typescript&logoColor=white">
  <img alt="Licença" src="https://img.shields.io/badge/License-MIT-green.svg">
</p>

## 📋 Sobre o Projeto

**Taskly** é um aplicativo móvel completo de gerenciamento de tarefas, desenvolvido em **React Native** e **TypeScript**. O projeto foi concebido como um desafio técnico para construir uma aplicação mobile robusta, aplicando conceitos avançados de segurança, componentização e gerenciamento de estado. O objetivo era criar uma experiência de usuário fluida e segura, desde o login até a organização detalhada de atividades do dia a dia.

Este projeto demonstra a implementação de um fluxo de autenticação completo, incluindo armazenamento seguro de credenciais, login com biometria e renovação automática de tokens (refresh token), funcionalidades essenciais em aplicações de mercado.

<br>

## ✨ Funcionalidades Principais

| Funcionalidade | Descrição |
| :--- | :--- |
| **🔐 Autenticação Segura** | Sistema completo de login e cadastro com validação de dados e tratamento de erros. Implementa **armazenamento seguro de tokens** no Keychain do dispositivo. |
| ** biometrico: Login com Biometria** | Permite aos usuários um acesso rápido e seguro utilizando a biometria do dispositivo (Fingerprint/Face ID), uma alternativa moderna à senha tradicional. |
| **🔄 Renovação de Sessão** | Gerenciamento automático da sessão do usuário através de **Refresh Tokens**, garantindo uma experiência contínua sem a necessidade de logins repetidos. |
| **📝 Gestão de Tarefas (CRUD)** | Interface intuitiva para criar, visualizar, editar e deletar tarefas, com campos para título, descrição, prazo, prioridade e tags. |
| **✔️ Subtarefas e Checklist** | Capacidade de dividir tarefas maiores em subtarefas menores (checklist), permitindo um acompanhamento detalhado do progresso. |
| **🎨 Personalização de Perfil** | Os usuários podem editar suas informações pessoais e selecionar um avatar de sua preferência, que é armazenado em um **bucket S3 da AWS**. |
| **🔍 Filtros e Ordenação** | Funcionalidade de filtro avançado que permite aos usuários ordenar e visualizar tarefas por prioridade, data de conclusão ou tags específicas. |

<br>

## 🚀 Tecnologias e Ferramentas

Este projeto foi construído utilizando tecnologias modernas do ecossistema mobile e JavaScript:

* **Framework:** React Native
* **Linguagem:** TypeScript
* **Navegação:** React Navigation (Stack & Tab Navigator)
* **Gerenciamento de Estado:** React Context API
* **Comunicação com API:** Axios (com interceptors para autenticação)
* **Segurança:**
    * `react-native-keychain` (Armazenamento seguro de tokens)
    * `react-native-biometrics` (Autenticação biométrica)
* **Estilização:** StyleSheet com organização modular.
* **Linting & Formatação:** ESLint e Prettier
* **Hooks de Git:** Lefthook para garantir a qualidade do código antes do commit.

## ⚙️ Como Executar o Projeto

Para executar o Taskly localmente, siga os passos abaixo.

#### **Pré-requisitos**

* Node.js (versão >= 18)
* Yarn ou npm
* Ambiente de desenvolvimento React Native configurado (Android Studio / Xcode).
* Uma instância da **[API do Taskly](URL_DA_SUA_API_SE_HOUVER)** rodando.

#### **Instalação**

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/JoaoVicttor07/RN-MAR25-taskly.git](https://github.com/JoaoVicttor07/RN-MAR25-taskly.git)
    cd RN-MAR25-taskly
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configuração da API:**
    No arquivo `src/services/api.ts`, altere a variável `API_BASE_URL` para o endereço do seu backend.
    ```typescript
    const API_BASE_URL = 'http://SEU_IP_OU_DOMINIO:3000';
    ```

4.  **Execute o aplicativo:**
    ```bash
    # Para Android
    npm run android

    # Para iOS
    npm run ios
    ```

---

## 👨‍💻 Autor

**João Victor Santos Da Costa**

* **LinkedIn:** [https://www.linkedin.com/in/seu-perfil/](https://www.linkedin.com/in/seu-perfil/)
* **GitHub:** [https://github.com/JoaoVicttor07](https://github.com/JoaoVicttor07)

# 📱 Taskly - Task App

Taskly is a mobile task management application developed to help users organize their activities, offering a range of features including biometric authentication, setting deadlines and priorities, and profile customization. The interface of this application was developed following the design specified in the provided Figma link.

---

## 📑 Table of Contents

- [⚙️ Features](#-features)
- [✍️ Mandatory Validations](#mandatory-validations)
- [🛠️ Technologies Used](#️-technologies-used)
- [📦 Installation](#-installation)
- [📂 Project Structure](#️-project-structure)
- [🧩 Organization](#️-organization)
- [🧑‍💻 Developers](#-developers)

## ⚙️ Features

#### 🔐 Authentication
- Login with `Remember me` option and complete registration with validations, integrated with the proposed API.

#### 🧑‍🎨 Initial Customization
- Avatar selection upon registration and in profile editing.

#### 🗂️ Task Management
- Add, edit, and remove tasks with title, description, due date, tags, and priority.

#### ✅ Detailed Subtasks
- Divide tasks into subtasks (checklist) for detailed tracking.

#### 🔍 Filtering
- View tasks by priority (high or low).

#### 📅 Organization
- Sort tasks by due date, tags, and priority.

#### 👤 Profile Editing
- View and edit information, choose avatar, and preferences for theme selection.

---

## ✍️ Mandatory Validations

#### 🔐 Login

- **Email:** Valid format (regex)
- **Password:** Minimum 8 characters
- **Error:** "Incorrect email and/or password"

#### ✍️ Sign Up

- **Full Name:** Minimum two names, up to 120 characters
- **Email:** Valid format
- **Phone:** Format (DDD) 9 dddd-dddd
- **Password:**
    - 8 to 20 characters
    - At least: 1 uppercase letter, 1 lowercase letter, 1 special character
- **Confirmation:** Passwords must match

#### 📌 Tasks

- **Title:** Text only, up to 100 characters, no emojis
- **Description:** Up to 500 characters, no emojis
- **Due Date:** Valid date
- **Tags:** Maximum 5, no spaces
- **Subtasks:** Text up to 200 characters

#### 👤 Profile

- **Full Name:** Compound name required
- **Phone:** (DD) 9 dddd-dddd

---

## 🛠️ Technologies Used

- [React Native](https://reactnative.dev/) - Framework for native mobile development with JavaScript.(https://reactnative.dev/img/header_logo.svg)

- [React Navigation](https://reactnavigation.org/) - Navigation between screens.
- [Async Storage](https://react-native-async-storage.github.io/async-storage/) - Asynchronous local storage.
- [TypeScript](https://www.typescriptlang.org/pt/docs/)
- [Axios](https://axios-http.com/ptbr/docs/intro) - For making HTTP requests.
- [Date-fns](https://date-fns.org/) and [Date-fns-tz](https://date-fns.org/tz) - For date and timezone manipulation.
- [React Native Collapsible](https://github.com/oblador/react-native-collapsible) - For collapsible sections.
- [JWT Decode](https://www.npmjs.com/package/jwt-decode) - For decoding JWT tokens.
- [React Native Biometrics](https://github.com/fingerprintjs/react-native-biometrics) - For biometric authentication.
- [React Native Date Picker](https://github.com/mmazzarolo/react-native-date-picker) - For date selection.
- [React Native Keychain](https://github.com/oblador/react-native-keychain) - For secure credential storage.
- [React Native Webview](https://github.com/react-native-webview/react-native-webview) - For displaying web content.
- [AppCenter](https://appcenter.ms/) and its modules (Analytics, Crashes) - For app monitoring and analytics.

---

## 📦 Installation

#### Clone the repository


```bash
git clone https://github.com/JoaoVicttor07/RN-MAR25-taskly.git
cd RN-MAR25-taskly
```

#### Install dependencies
```bash
npm install
```

#### Start the Server
```bash
npm start
```

#### Run the application
```bash
npm run android
```

---

## 📂 Project Structure
The file and folder structure of the project is organized as follows:
```

📁 src                         # Código-fonte principal
├── 📁 Assets                  # Arquivos estáticos 
│   ├── 📁 Images              # Arquivos de imagem
│   ├── 📁 fonts               # Arquivos de fontes
│   └── 📁 icons               # Arquivos de ícones
│
├── 📁 Navigation              # Lógica de navegação da aplicação
│       ├── index.tsx       
│       └── types.ts            
│
├── 📁 Screens                 # Telas da aplicação
│   ├── 📁 Home                # Tela principal do aplicativo
│   │   ├── Index.tsx           # Componente da tela Home
│   │   └── style.ts            # Estilos para a tela Home
│   └── 📁 Login               # Tela de login
│       ├── 📁 Modal           # Componente modal específico para a tela de Login
│       │   ├── Index.tsx       # Componente do modal de Login 
│       │   └── style.ts        # Estilos para o modal de Login
│       ├── Index.tsx           # Componente da tela de Login
│       └── style.ts            # Estilos para a tela de Login
│
├── 📁 Theme                   # Definições de temas para a aplicação
│   └── fonts.ts                # Estilos e configurações de fontes
│
├── 📁 Utils                   # Funções utilitárias reutilizáveis
│   ├── authUtils.ts            # Funções relacionadas à autenticação
│   └── validateDate.ts         # Funções para validar datas
│
├── 📁 components              # Componentes React reutilizáveis
│   ├── 📁 button              # Componente de botão personalizado
│   │   ├── index.tsx           # Componente do botão  
│   │   └── style.ts            # Estilos para o componente de botão 
│   └── 📁 input               # Componente de input  personalizado 
│       ├── index.tsx           # Componente do input
│       └── style.ts            # Estilos para o componente de input
│
├── 📁 hooks                   # Hooks personalizados do React
│   └── useApi.ts               # Hook para interagir com uma API
│
├── 📁 screens/Notifications   # Tela de notificações
│   ├── index.tsx               # Componente da tela de notificações
│   └── style.ts                # Estilos para a tela de notificações
│
└── App.tsx                     # Ponto de entrada principal da aplicação React Native
 
```

## 🧩 Organization

The development team for this project is organized as follows:

- **Presenter (P.O):** Amanda Duarte Meneghini do Carmo
- **Developer (Dev):** Diogo da Silva Souza
- **Developer (Dev):** Jailson Rodrigues de Neiva
- **Quality Assurance (QA):** João Victor Santos da Costa
- **Scrum Master:** Camila Cardozo Rocha


## 🧑‍💻 Developers

This project was developed by a team of dedicated collaborators:

- Amanda Duarte Meneghini do Carmo
- Camila Cardozo Rocha
- Diogo da Silva Souza
- Jailson Rodrigues de Neiva
- João Victor Santos da Costa


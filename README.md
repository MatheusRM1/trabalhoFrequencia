# 📱 TrabalhoFrequencia - Sistema de Controle de Frequência

> **Trabalho Final da Disciplina de Desenvolvimento para Dispositivos Móveis**  
> Universidade Federal de Juiz de Fora (UFJF)

## 📋 Sobre o Projeto

O **TrabalhoFrequencia** é um aplicativo móvel desenvolvido em React Native/Expo que permite aos estudantes registrar sua presença em aulas através da leitura de QR Codes. O sistema funciona completamente offline, armazenando dados localmente no dispositivo.

### 🎯 Funcionalidades Principais

- **📝 Cadastro de Aluno**: Registro de matrícula e nome do estudante
- **📸 Scanner QR Code**: Leitura de códigos QR para registrar presença nas aulas
- **📚 Seleção de Disciplinas**: Escolha da matéria antes de registrar a presença
- **📊 Controle de Faltas**: Visualização de estatísticas de frequência por disciplina
- **👥 Presenças do Dia**: Lista de todas as presenças registradas na data atual
- **💾 Funcionamento Offline**: Todos os dados são armazenados localmente com AsyncStorage

### 🏗️ Disciplinas Disponíveis

- Matemática (4 aulas/semana)
- Português (3 aulas/semana)
- História (2 aulas/semana)
- Desenvolvimento Mobile (3 aulas/semana)
- Física (3 aulas/semana)
- Química (2 aulas/semana)

## 🚀 Tecnologias Utilizadas

- **React Native** com **Expo SDK 53**
- **TypeScript** para tipagem estática
- **Expo Router** para navegação
- **Expo Camera** para scanner de QR Code
- **AsyncStorage** para persistência de dados
- **React Navigation** com Drawer Navigator

## 📱 Estrutura do App

```
app/
├── (drawer)/           # Navegação principal
│   ├── index.tsx      # Tela inicial (cadastro)
│   ├── scanner.tsx    # Scanner QR Code
│   ├── alunos-presentes.tsx  # Lista de presenças do dia
│   └── faltas.tsx     # Controle de faltas
├── _layout.tsx        # Layout principal
└── hooks/             # Custom hooks
    ├── useAlunoData.ts
    ├── useAlunosPresentes.ts
    ├── useFaltas.ts
    ├── useQRScanner.ts
    └── useDisciplinas.ts
```

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI
- Dispositivo móvel com Expo Go ou emulador Android/iOS

### Passos para executar

1. **Clone o repositório**
   ```bash
   git clone https://github.com/MatheusRM1/trabalhoFrequencia.git
   cd trabalhoFrequencia
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npx expo start
   ```

4. **Execute no dispositivo**
   - **Celular**: Escaneie o QR Code com o app Expo Go
   - **Emulador Android**: Pressione `a` no terminal
   - **Simulador iOS**: Pressione `i` no terminal

## 📖 Como Usar

### 1. 📝 Primeiro Acesso
- Abra o app e cadastre sua matrícula e nome completo
- Os dados ficam salvos localmente no dispositivo

### 2. 📸 Registrar Presença
- Vá para a tela "Registrar Presença"
- Selecione a disciplina da aula
- Aponte a câmera para o QR Code fornecido pelo professor
- Confirme o registro da presença

### 3. 📊 Acompanhar Frequência
- **Presenças do Dia**: Veja todas as presenças registradas hoje
- **Controle de Faltas**: Monitore sua frequência por disciplina

## 🏫 Contexto Acadêmico

Este projeto foi desenvolvido como trabalho final para a disciplina de **Desenvolvimento para Dispositivos Móveis** da **Universidade Federal de Juiz de Fora (UFJF)**. 

### 🎓 Objetivos do Trabalho
- Aplicar conceitos de desenvolvimento mobile com React Native
- Implementar funcionalidades de câmera e scanner de QR Code
- Gerenciar estado e persistência de dados local
- Criar uma interface responsiva e intuitiva
- Demonstrar arquitetura limpa com custom hooks e componentes reutilizáveis

## 👨‍💻 Desenvolvedor

**Matheus Ribeiro Marques**  
Estudante de Ciência da Computação - UFJF

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos como parte do curso de Ciência da Computação da UFJF.

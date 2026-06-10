# MACRO-C

Sistema de Gerenciamento de Microserviços Corporativos desenvolvido para centralizar o monitoramento, administração e controle de serviços tecnológicos utilizados por uma organização.

## 📋 Sobre o Projeto

O MACRO-C é uma plataforma web criada para auxiliar equipes de Tecnologia da Informação no gerenciamento de microserviços, automações e chamados técnicos.

A aplicação oferece uma visão integrada dos serviços da empresa, permitindo monitoramento em tempo real, controle operacional, comunicação interna entre usuários e gerenciamento completo de usuários e chamados.

## 🚀 Funcionalidades

### 👥 Gerenciamento de Usuários

- Cadastro de usuários
- Edição de informações
- Ativação e desativação de contas
- Exclusão de usuários
- Controle de permissões por perfil

### ⚙️ Gerenciamento de Microserviços

- Cadastro de microserviços
- Monitoramento de status
- Visualização de serviços ativos e inativos
- Atualização de informações dos serviços
- Iniciar serviços
- Parar serviços
- Reiniciar serviços
- Registro de ações em logs

### 🎫 Chamados Técnicos

- Abertura de chamados
- Definição de prioridade
- Acompanhamento do andamento
- Atualização de status
- Encerramento de chamados

### 📊 Dashboard

- Indicadores gerais do sistema
- Estatísticas de serviços
- Monitoramento de microserviços
- Visualização de chamados

### 💬 Chat

- Conversas entre usuários
- Histórico de mensagens
- Comunicação interna em tempo real
- Criação de novas conversas

### 📝 Logs

- Registro de ações críticas
- Histórico de operações
- Controle de atividades do sistema

---

## 🏗️ Arquitetura

O sistema foi desenvolvido seguindo uma arquitetura baseada em APIs, permitindo integração com serviços internos e externos.

### Backend

- Spring Boot
- Java
- JWT Authentication
- Firebase Firestore

### Frontend

- Angular
- TypeScript
- HTML5
- SCSS

### Banco de Dados

- Firebase Firestore
  
---

## 🔐 Controle de Acesso

O sistema possui autenticação baseada em JWT e controle de permissões por perfil.

### Perfis

#### Administrador

Possui acesso completo ao sistema:

- Gerenciar usuários

  
#### TI

Responsável pela administração operacional:
- Gerenciar chamados
- Visualizar dashboard
- Acessar chat
- Monitorar serviços
- Iniciar, parar e reiniciar microserviços
- Gerenciar chamados
- Utilizar chat interno
- Abrir chamados
- Acompanhar chamados
- Utilizar chat interno
- Visualizar informações permitidas

---

## 📁 Estrutura de Dados

O sistema utiliza o Firebase Firestore com coleções organizadas em documentos JSON.

### Principais Coleções

```text
Usuarios
Microservicos
Chamados
Conversas
 └── Mensagens
Logs
```

---

## 🛠️ Instalação

### Clonar Repositório

```bash
git clone https://github.com/KauaBrenoQuerubino/MACRO-C.git
```

### Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
ng serve
```

A aplicação estará disponível em:

```text
http://localhost:4200
```

---

## 🔮 Melhorias Futuras

* Notificações em tempo real
* Monitoramento avançado de serviços
* Integração com WhatsApp
* Relatórios gerenciais
* Métricas de desempenho
* Aplicação mobile
* Refatoração do módulo de chat utilizando WebSocket para comunicação em tempo real

---

## 👨‍💻 Desenvolvedor

**Kauã Breno Querubino**

GitHub:
[https://github.com/KauaBrenoQuerubino](https://github.com/KauaBrenoQuerubino)

---

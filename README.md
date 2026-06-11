# 📝 Lista de Tarefas

Aplicação fullstack de gerenciamento de tarefas com **Angular**, **Spring Boot** e **PostgreSQL**.

---

## 🚀 Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Frontend | Angular 19+ |
| Backend | Spring Boot |
| Banco de Dados | PostgreSQL |

---

## ✨ Funcionalidades

- ✅ Listar tarefas
- ➕ Adicionar nova tarefa
- ✏️ Editar tarefa existente
- ✔️ Marcar tarefa como concluída
- 🗑️ Deletar tarefa

---

## 📁 Estrutura do Projeto

```
Lista_de_Tarefas/
├── frontend/   # Angular
└── backend/    # Spring Boot
```

---

## ⚙️ Como Rodar o Projeto

### 📌 Pré-requisitos

- Node.js 18+
- Java 17+
- PostgreSQL
- Maven

---

## 🗄️ Banco de Dados

### 1. Criar o banco

```sql
CREATE DATABASE lista_tarefas;
```

### 2. Variável de ambiente (IMPORTANTE)

Para não expor senha no código, use variável de ambiente:

**💻 Windows (PowerShell)**

```powershell
setx DB_PASSWORD "sua_senha"
```

> 👉 Depois reinicie o terminal.

### 3. Configuração do backend

No arquivo `backend/src/main/resources/application.properties`, use:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/lista_tarefas
spring.datasource.username=postgres
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

## 🔧 Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

📍 API rodando em: `http://localhost:8080/tarefas`

---

## 🌐 Frontend (Angular)

```bash
cd frontend
npm install
ng serve
```

📍 Aplicação: `http://localhost:4200`

---

## 🔗 Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/tarefas` | Lista todas as tarefas |
| `POST` | `/tarefas` | Cria uma nova tarefa |
| `PUT` | `/tarefas/{id}` | Atualiza uma tarefa |
| `DELETE` | `/tarefas/{id}` | Remove uma tarefa |

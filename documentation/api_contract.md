# 📘 API Contracts – Project & Task Management

## 📁 Projects

### 🔹 POST /projects – Criar projeto

**Request Body:**
```json
{
  "name": "Projeto X",
  "description": "Projeto de demonstração",
  "startDate": "2025-07-17"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "Projeto X",
  "description": "Projeto de demonstração",
  "startDate": "2025-07-17",
  "tasks": []
}
```

---

### 🔹 GET /projects – Listar todos os projetos

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Projeto X",
    "description": "Projeto de demonstração",
    "startDate": "2025-07-17",
    "tasks": [
      {
        "id": "uuid",
        "title": "Tarefa 1",
        "description": "Detalhes",
        "dueDate": "2025-07-18",
        "done": false
      }
    ]
  }
]
```

---

## 📁 Tasks

### 🔹 POST /projects/:projectId/tasks – Adicionar tarefa a um projeto

**Request Body:**
```json
{
  "title": "Tarefa 1",
  "description": "Detalhes da tarefa",
  "dueDate": "2025-07-18"
}
```

**Response:**
```json
{
  "id": "uuid",
  "title": "Tarefa 1",
  "description": "Detalhes da tarefa",
  "dueDate": "2025-07-18",
  "done": false
}
```

---

### 🔹 GET /projects/:projectId/tasks – Listar tarefas de um projeto

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Tarefa 1",
    "description": "Detalhes da tarefa",
    "dueDate": "2025-07-18",
    "done": false
  }
]
```

---

### 🔹 PATCH /tasks/:taskId/done – Marcar uma tarefa como concluída

**Response:**
```json
{
  "id": "uuid",
  "done": true
}
```

---

### 🔹 DELETE /tasks/:taskId – Excluir uma tarefa

**Response:**
HTTP 204 No Content

---

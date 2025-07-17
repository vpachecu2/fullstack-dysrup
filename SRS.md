
# 📘 Requirements Specification – Project Management App

## 🔹 1. Functional and Business Analysis

O sistema permitirá a criação e o gerenciamento de projetos e tarefas, voltado para facilitar a organização e acompanhamento de entregas. Cada projeto terá múltiplas tarefas com status de execução, podendo ser visualizadas, concluídas ou removidas.

## 🔹 2. Business Rules (BR)

### BR_001 – O nome do projeto é obrigatório e único por usuário  
### BR_002 – A data de conclusão da tarefa deve ser igual ou posterior à data de início do projeto  
### BR_003 – Uma tarefa só pode ser marcada como concluída se estiver associada a um projeto  
### BR_004 – A exclusão de uma tarefa não pode afetar o projeto ao qual ela pertence

## 🔹 3. Functional Requirements (FR)

| Código  | Nome                         | Descrição                                                                 |
|---------|------------------------------|---------------------------------------------------------------------------|
| FR_001  | Criar Projeto                | Permitir que o usuário crie projetos com nome, descrição e data de início |
| FR_002  | Listar Projetos              | Exibir todos os projetos existentes                                       |
| FR_003  | Adicionar Tarefa             | Adicionar tarefas a um projeto existente                                  |
| FR_004  | Listar Tarefas de um Projeto | Listar todas as tarefas de um projeto                                     |
| FR_005  | Marcar Tarefa como Concluída | Alterar o status da tarefa para “concluída”                               |
| FR_006  | Excluir Tarefa               | Remover uma tarefa de um projeto                                          |

## 🔹 4. Non-Functional Requirements (NFR)

| Código   | Requisito                                              |
|----------|--------------------------------------------------------|
| NFR_001  | A API deve seguir os padrões RESTful                  |
| NFR_002  | A resposta da API deve ocorrer em até 500ms           |
| NFR_003  | O frontend deve ser responsivo                        |
| NFR_004  | A comunicação entre frontend e backend deve usar HTTPS |

## 🔹 5. Use Cases (UC)

### UC_001 – Criar Projeto
**Ator**: Usuário  
**Fluxo Principal**:
1. Usuário preenche nome, descrição e data de início
2. Clica em “Criar”
3. Projeto é salvo no banco

### UC_002 – Adicionar Tarefa
**Fluxo Principal**:
1. Usuário acessa um projeto existente
2. Preenche título, descrição e data de conclusão
3. Clica em “Adicionar Tarefa”
4. Tarefa é adicionada ao projeto

(Outros UCs seguem o mesmo padrão)

## 🔹 6. Test Cases (TC)

| Código   | Objetivo                    | Cenário                                      | Resultado Esperado              |
|----------|-----------------------------|----------------------------------------------|---------------------------------|
| TC_001   | Criar projeto com dados válidos | Nome, descrição e data preenchidos           | Projeto criado com sucesso      |
| TC_002   | Adicionar tarefa            | Título, descrição e data de conclusão válidos| Tarefa adicionada               |
| TC_003   | Marcar tarefa como concluída | Clicar em botão de conclusão                 | Status `done = true`            |
| TC_004   | Excluir tarefa              | Clicar no ícone de deletar                   | Tarefa removida da lista        |

## 🔹 7. Risks and Potential Bugs

- RISK_001 – Data inconsistente entre tarefas e projetos (ex: tarefas com datas inválidas)
- BUG_001 – Projeto salvo sem nome (validação mal feita)
- BUG_002 – Status de tarefa não atualiza no frontend após marcação como concluída

## 🔹 8. Improvement Suggestions

- SM_001 – Adicionar campo de prioridade nas tarefas  
- SM_002 – Permitir ordenação de tarefas por status ou data  
- SM_003 – Adicionar filtro de busca por nome de projeto/tarefa

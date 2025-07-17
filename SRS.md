📌 Especificação de Requisitos
🎯 Objetivo
Desenvolver uma aplicação de Gerenciamento de Projetos, onde o usuário poderá:

Criar e listar projetos

Adicionar, listar, marcar como concluídas e excluir tarefas dentro de projetos

🧱 Entidades Principais
1. Projeto (Project)
Campo	Tipo	Obrigatório	Descrição
id	UUID	Sim	Identificador único
name	string	Sim	Nome do projeto
description	string	Não	Descrição opcional
startDate	date	Sim	Data de início do projeto
createdAt	datetime	Sim	Data de criação (auto)
updatedAt	datetime	Sim	Data de atualização (auto)

2. Tarefa (Task)
Campo	Tipo	Obrigatório	Descrição
id	UUID	Sim	Identificador único
projectId	UUID	Sim	Referência ao projeto (chave estrangeira)
title	string	Sim	Título da tarefa
description	string	Não	Descrição opcional
dueDate	date	Sim	Data de conclusão prevista
done	boolean	Sim	Se a tarefa está concluída ou não
createdAt	datetime	Sim	Data de criação (auto)
updatedAt	datetime	Sim	Data de atualização (auto)

🔄 Regras de Negócio
Um Projeto pode conter múltiplas tarefas.

Uma Tarefa sempre pertence a um projeto.

Uma tarefa pode ser marcada como concluída (sem deletar).

O usuário pode excluir tarefas, mas não projetos (exceto se decidir adicionar essa funcionalidade).

Datas devem ser validadas (ex: data de conclusão de tarefa não pode ser anterior à data de início do projeto).

🧪 Funcionalidades Essenciais
Recurso	Método HTTP	Endpoint	Descrição
Criar projeto	POST	/projects	Cria um novo projeto
Listar todos os projetos	GET	/projects	Retorna todos os projetos
Adicionar tarefa a um projeto	POST	/projects/:id/tasks	Cria uma tarefa vinculada a um projeto
Listar tarefas de um projeto	GET	/projects/:id/tasks	Lista todas as tarefas de um projeto
Marcar tarefa como concluída	PATCH	/tasks/:id/complete	Atualiza o status done = true
Excluir tarefa	DELETE	/tasks/:id	Remove uma tarefa

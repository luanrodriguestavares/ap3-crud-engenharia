# AP3 - CRUD - Tópicos Esp. em engenharia de software

Este é um projeto full-stack que implementa uma aplicação CRUD (Create, Read, Update, Delete) com automação de ambiente em Ansible.

## Arquitetura do Projeto

O projeto é dividido em três componentes principais:

### Frontend

- Localizado em `/frontend`
- Desenvolvido com React + Vite
- Estilização com Tailwind CSS
- Comunica com o backend através de API REST

### Backend

- Localizado em `/backend`
- API REST desenvolvida com Node.js
- Gerencia a lógica de negócios e persistência de dados
- Conecta-se ao banco de dados MySQL

### Automação (Ansible)

- Localizado em `/ansible`
- Scripts de automação para configuração do ambiente
- Suporte para Windows (PowerShell) e Linux/Unix (Ansible)

## Configuração do Ambiente

### Pré-requisitos

- Node.js e npm
- MySQL (ou XAMPP para Windows)
- Git

### Windows

Para configurar o ambiente no Windows, execute:

```powershell
.\ansible\playbook.ps1
```

O script PowerShell irá:

1. Verificar pré-requisitos
2. Configurar variáveis de ambiente
3. Instalar dependências
4. Iniciar a aplicação

### Linux/Unix

Para configurar o ambiente usando Ansible:

```bash
ansible-playbook ansible/playbook.yml
```

O playbook Ansible irá:

1. Instalar dependências do sistema
2. Configurar o MySQL
3. Instalar dependências do projeto
4. Configurar variáveis de ambiente
5. Iniciar a aplicação

## Variáveis de Ambiente

### Backend (.env)

```
NODE_ENV=development
PORT=3000
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=crud_app_dev
DB_HOST=localhost
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:3000
```

## Portas Utilizadas

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- MySQL: 3306

## Estrutura de Diretórios

```

├── frontend/         # Aplicação React
├── backend/          # API Node.js
├── ansible/          # Scripts de automação
│   ├── playbook.yml  # Playbook Ansible
│   └── playbook.ps1  # Script PowerShell
└── .gitignore
```

## Fluxo de Dados

1. Frontend faz requisições HTTP para o Backend
2. Backend processa as requisições e interage com o banco de dados
3. Respostas são enviadas de volta ao Frontend
4. Frontend atualiza a interface do usuário

## Tecnologias Utilizadas

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js
- Banco de Dados: MySQL
- Automação: Ansible, PowerShell

## Notas Adicionais

- O projeto utiliza automação para garantir consistência no ambiente de desenvolvimento
- Scripts de automação estão disponíveis tanto para Windows quanto para Linux/Unix
- O banco de dados é configurado automaticamente durante a instalação

## Equipe

- Luan Rodrigues
- Jadsom Magalhães
- Davi Albuquerque
- Adriano de Sousa
- Eduardo Melo

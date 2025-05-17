# Configuração do Ambiente

Este diretório contém scripts para automatizar a configuração do ambiente de desenvolvimento.

## Opção 1: Usando PowerShell (Recomendado para Windows)

### Pré-requisitos

1. Node.js e npm instalados
2. XAMPP instalado (para MySQL)

### Como usar

1. Certifique-se de que o XAMPP está instalado e o MySQL está rodando

2. Execute o script PowerShell:
```powershell
.\playbook.ps1
```

O script irá:
- Verificar todos os pré-requisitos
- Configurar as variáveis de ambiente
- Instalar as dependências do backend e frontend
- Iniciar a aplicação em modo de desenvolvimento

## Opção 2: Usando Ansible (Alternativa)

### Pré-requisitos

1. Ansible instalado (via WSL no Windows)
2. XAMPP instalado (para MySQL)
3. Node.js e npm instalados

### Como usar

1. Instale o WSL e o Ansible:
```powershell
wsl --install
```

2. No WSL, instale o Ansible:
```bash
sudo apt update
sudo apt install ansible
```

3. Execute o playbook:
```bash
ansible-playbook playbook.yml
```

## Variáveis

As principais variáveis configuráveis estão no início dos scripts:

- `db_name`: Nome do banco de dados (padrão: crud_app_dev)
- `db_user`: Usuário do MySQL (padrão: root)
- `db_password`: Senha do MySQL (padrão: vazio)

## Notas

- Os scripts assumem que você está usando o XAMPP com as configurações padrão
- As portas padrão são:
  - Backend: 3000
  - Frontend: 5173 (Vite)
  - MySQL: 3306 
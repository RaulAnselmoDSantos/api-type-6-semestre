<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# OlheOleo

> **OlheOleo** é uma API RESTful para gerenciamento de veículos e controle de produtos/serviços utilizados, construída com NestJS e TypeScript.

## 📖 Sumário

* [🚀 Visão Geral](#-visão-geral)
* [✨ Funcionalidades](#-funcionalidades)
* [⚙️ Pré-requisitos e Stack](#️-pré-requisitos-e-stack)
* [📦 Instalação e Execução](#-instalação-e-execução)
* [🐳 Docker & Docker Compose](#-docker--docker-compose)
* [🌐 Configuração de Ambiente](#-configuração-de-ambiente)
* [▶️ Execução Local](#️-execução-local)
* [📚 Documentação da API](#-documentação-da-api)
* [💡 Roadmap & CI/CD](#-roadmap--cicd)
* [🧪 Testes](#-testes)
* [🤝 Contribuição](#-contribuição)
* [📝 Licença](#-licença)

## 🚀 Visão Geral

**OlheOleo** foi desenvolvido para atender **oficinas mecânicas** e **usuários finais** que precisam cadastrar, atualizar e consultar informações de veículos e dos produtos/serviços aplicados a eles.

### Objetivos

* Armazenar dados de veículos (marca, modelo, ano, placa).
* Registrar histórico de manutenção e insumos utilizados.
* Oferecer autenticação segura via JWT.

## ✨ Funcionalidades

* **Auth**: login e geração de JWT (`/auth/login`).
* **Usuário**: CRUD de usuários (`/users`).
* **Veículo**: CRUD de veículos (`/veiculos`).
* Proteção de rotas com Guards e Roles.
* Documentação interativa via Swagger.

## ⚙️ Pré-requisitos e Stack

* **Node.js** >= 14.0.0
* **npm** >= 6.0.0
* **NestJS** 10.0.0
* **TypeScript** 5.1.3
* **Prisma** 6.1.0
* **PostgreSQL** 15.x

## 📦 Instalação e Execução

1. Clone o repositório:

   ```bash
   git clone https://github.com/yourusername/olheoleo.git
   cd olheoleo
   ```
2. Instale as dependências:

   ```bash
   npm install
   ```

## 🐳 Docker & Docker Compose

Para levantar o banco PostgreSQL localmente, crie um `docker-compose.yml` na raiz:

```yaml
version: '3.8'
services:
  db:
    image: postgres:15
    container_name: olheoleo-postgres
    environment:
      POSTGRES_USER: usuario
      POSTGRES_PASSWORD: senha123
      POSTGRES_DB: appoo
    ports:
      - '5432:5432'
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

Em seguida, execute:

```bash
docker-compose up -d
```

## 🌐 Configuração de Ambiente

Copie o template de variáveis:

```bash
cp .env.example .env
```

Edite `.env` com suas credenciais e parâmetros:

```dotenv
DATABASE_URL="postgresql://usuario:senha123@192.168.0.190:5432/appoo?schema=public"
JWT_SECRET="sua_chave_secreta"
JWT_EXPIRES_IN="3600s"
```

## ▶️ Execução Local

* **Modo Desenvolvimento** (com hot-reload):

  ```bash
  npm run start:dev
  ```
* **Build e Produção**:

  ```bash
  npm run build
  npm run start:prod
  ```

Acesse `http://localhost:3000`.

## 📚 Documentação da API

O Swagger está disponível em:

```
GET http://localhost:3000/api
```

## 💡 Roadmap & CI/CD

* (Em breve)

## 🧪 Testes

Atualmente ainda não há testes, mas planejamos usar **Jest** para:

* Testes unitários (`npm run test`)
* Testes E2E (`npm run test:e2e`)
* Coverage (`npm run test:cov`)

## 🤝 Contribuição

Contribuições são bem-vindas! Abra issues e pull requests:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/minha-nova-feature`)
3. Commit suas alterações (`git commit -m "feat: descrição da feature"`)
4. Push na branch (`git push origin feature/minha-nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Projeto sem licença aberta (UNLICENSED). Mantenedor: **Raul Santos**.


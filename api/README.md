# Todo List API

Backend da aplicação Todo List construído com Node.js, Fastify e Prisma.

## 🚀 Tecnologias

- **Node.js 22+** - Runtime JavaScript
- **Fastify** - Framework web performático
- **TypeScript** - Tipagem estática
- **Prisma** - ORM moderno
- **PostgreSQL** - Banco de dados
- **Zod** - Validação de schemas
- **Vitest** - Framework de testes
- **Swagger/OpenAPI** - Documentação automática
- **ESLint + Prettier** - Code quality

## 📁 Estrutura

```
api/
├── prisma/
│   ├── schema.prisma      # Schema do banco
│   └── migrations/        # Migrações
├── src/
│   ├── modules/
│   │   ├── health/        # Health check
│   │   └── tasks/         # Módulo de tarefas
│   ├── config/            # Configurações
│   ├── errors/            # Tratamento de erros
│   ├── lib/               # Bibliotecas
│   ├── routes/            # Rotas
│   └── schemas/           # Schemas de validação
├── tests/                 # Testes
└── Dockerfile
```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na pasta `api/`:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5433/todo_list_dev"

# Server
PORT=3333
HOST=0.0.0.0
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:3333
```

## 🛠️ Executando Localmente

### 1. Pré-requisitos

```bash
# Node.js 22+ e pnpm
node --version  # >= 22.12.0
pnpm --version  # >= 10.0.0
```

### 2. Instalar Dependências

```bash
cd api
pnpm install
```

### 3. Configurar Banco de Dados

```bash
# Usar docker-compose.dev.yml (recomendado)
docker compose -f ../docker-compose.dev.yml up -d

# Executar migrações
pnpm prisma migrate dev

# (Opcional) Visualizar dados
pnpm prisma studio
```

### 4. Executar em Desenvolvimento

```bash
# Modo desenvolvimento com hot reload
pnpm dev

# A API estará disponível em http://localhost:3333
# Documentação em http://localhost:3333/docs
```

### 5. Build para Produção

```bash
# Compilar TypeScript
pnpm build

# Executar versão compilada
pnpm start
```

## 🧪 Testes

```bash
# Executar todos os testes
pnpm test

# Testes de integração
pnpm test:integration

# Testes em modo watch
pnpm test --watch
```

## 📊 Scripts Disponíveis

```bash
pnpm dev              # Desenvolvimento com nodemon
pnpm build            # Compilar TypeScript
pnpm start            # Executar versão de produção
pnpm test             # Executar testes
pnpm test:integration # Testes de integração
pnpm typecheck        # Verificar tipos
pnpm lint             # Executar ESLint
pnpm lint:fix         # Corrigir problemas de lint
pnpm format           # Formatar código com Prettier
pnpm prisma:studio    # Abrir Prisma Studio
pnpm prisma:generate  # Gerar Prisma Client
pnpm generate:openapi # Gerar documentação OpenAPI
```

## 📖 API Endpoints

### Health Check

- `GET /health` - Status da API

### Tasks

- `GET /tasks` - Listar todas as tarefas
- `POST /tasks` - Criar nova tarefa
- `PUT /tasks/:id` - Atualizar tarefa
- `DELETE /tasks/:id` - Deletar tarefa

### Documentação

- `GET /docs` - Swagger UI
- `GET /docs/json` - OpenAPI JSON

# Todo List Web

Frontend da aplicação Todo List construído com Vue.js 3, TypeScript e TailwindCSS.

## 🚀 Tecnologias

- **Vue.js 3** - Framework progressivo
- **TypeScript** - Tipagem estática
- **Vite** - Build tool moderna
- **PrimeVue** - Biblioteca de componentes UI
- **TailwindCSS** - Framework CSS utilitário
- **Pinia** - Store management
- **TanStack Query** - Server state management
- **Axios** - Cliente HTTP
- **ESLint + Prettier** - Code quality

## 📁 Estrutura

```
web/
├── public/
│   └── favicon.ico        # Ícone da aplicação
├── src/
│   ├── api/
│   │   ├── axios.config.ts    # Configuração do Axios
│   │   └── generated/         # APIs geradas do backend
│   ├── assets/
│   │   └── main.css          # Estilos globais
│   ├── components/
│   │   ├── TaskForm.vue      # Formulário de tarefa
│   │   ├── TaskItem.vue      # Item de tarefa
│   │   └── TaskList.vue      # Lista de tarefas
│   ├── stores/
│   │   └── taskStore.ts      # Store Pinia para tarefas
│   ├── App.vue               # Componente raiz
│   └── main.ts               # Entry point
├── index.html                # Template HTML
├── nginx.conf                # Configuração Nginx para produção
└── Dockerfile
```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na pasta `web/`:

```env
# API URL
VITE_API_BASE_URL=http://localhost:3333

# Ambiente
VITE_NODE_ENV=development
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
cd web
pnpm install
```

### 3. Executar em Desenvolvimento

```bash
# Modo desenvolvimento com hot reload
pnpm dev

# A aplicação estará disponível em http://localhost:3000
```

### 4. Build para Produção

```bash
# Compilar para produção
pnpm build

# Preview da versão de produção
pnpm preview
```

## 📊 Scripts Disponíveis

```bash
pnpm dev          # Desenvolvimento com Vite
pnpm build        # Build para produção
pnpm preview      # Preview da versão de produção
pnpm build-only   # Build sem type checking
pnpm type-check   # Verificar tipos TypeScript
pnpm lint         # Executar ESLint
pnpm format       # Formatar código com Prettier
```

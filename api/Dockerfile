######## base ########
FROM node:22-alpine AS base

RUN apk add --no-cache libc6-compat openssl
RUN corepack enable && corepack prepare pnpm@10.7.0 --activate

WORKDIR /app

######## shared ########
FROM base AS shared-builder

COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY shared/package.json ./shared/

RUN pnpm install --frozen-lockfile --filter shared

COPY shared ./shared

WORKDIR /app/shared

RUN pnpm build

######## api ########
FROM base AS api-builder

COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY api/package.json ./api/
COPY shared/package.json ./shared/

RUN pnpm install --frozen-lockfile --filter api...

COPY --from=shared-builder /app/shared ./shared
COPY api ./api

WORKDIR /app/api

RUN pnpm prisma generate
RUN pnpm build

######## runner ########
FROM base AS runner

COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY api/package.json ./api/
COPY shared/package.json ./shared/

COPY --from=api-builder /app/node_modules/.pnpm/@prisma+client* ./node_modules/.pnpm/

RUN pnpm install --frozen-lockfile --filter api... --prod

COPY --from=api-builder /app/api/dist ./api/dist
COPY --from=api-builder /app/api/prisma ./api/prisma
COPY --from=shared-builder /app/shared/dist ./shared/dist

EXPOSE 3000

WORKDIR /app/api

CMD ["pnpm", "start:migrate"]
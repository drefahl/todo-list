######## web ########
FROM node:22-alpine AS web-builder

ARG VITE_API_BASE_URL

RUN corepack enable && corepack prepare pnpm@10.7.0 --activate

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY web/package.json ./web/
COPY shared/package.json ./shared/

RUN pnpm install --frozen-lockfile --filter web...

COPY shared ./shared
RUN pnpm --filter shared build

COPY web ./web

ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

RUN pnpm --filter web build

######## runner ########
FROM nginx:1.27-alpine as runner

COPY --from=web-builder /app/web/dist /usr/share/nginx/html

COPY web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
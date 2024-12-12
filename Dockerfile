FROM node:18-alpine AS base

FROM base AS deps
WORKDIR /app
# Install dependencies for sharp
COPY package*.json yarn.lock* ./
RUN  \
  if [ -f yarn.lock ]; then yarn install ; \
  else npm ci; \
  fi

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

FROM base AS production
WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]

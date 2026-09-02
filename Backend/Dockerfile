# ==========================================
# 1. DEPS STAGE
# ==========================================
FROM node:20-alpine AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

# ==========================================
# 2. BUILDER STAGE
# ==========================================
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY package*.json tsconfig.json ./
COPY prisma ./prisma/
COPY src ./src

RUN npx prisma generate
RUN npm run build

# ==========================================
# 3. PRODUCTION RUNNER STAGE
# ==========================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
RUN apk add --no-cache dumb-init

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package*.json ./

COPY start.sh ./start.sh
RUN chmod +x ./start.sh

USER node
EXPOSE 5000

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["./start.sh"]


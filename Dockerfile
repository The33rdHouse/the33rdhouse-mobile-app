# ── Build stage ───────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9 --activate

WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source and build the server bundle
COPY . .
RUN pnpm build

# ── Runtime stage ─────────────────────────────────────────────────────────────
FROM node:22-alpine AS runner

# Install pnpm (needed for production installs if any)
RUN corepack enable && corepack prepare pnpm@9 --activate

WORKDIR /app

# Copy only production dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# Copy compiled server bundle
COPY --from=builder /app/dist ./dist

# Drizzle migrations (run at deploy time, not container start)
COPY drizzle ./drizzle
COPY drizzle.config.ts ./

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "dist/index.js"]

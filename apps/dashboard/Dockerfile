# === STAGE 1: Build the frontend app ===
FROM node:20 AS builder

WORKDIR /app

# Enable PNPM via Corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy monorepo config
COPY pnpm-lock.yaml package.json pnpm-workspace.yaml turbo.json ./

# Copy app and shared packages
COPY apps ./apps
COPY packages ./packages

# Install dependencies
RUN pnpm install --frozen-lockfile --shamefully-hoist

# Build only the frontend app
RUN pnpm turbo run build --filter=dashboard...

# === STAGE 2: Lightweight production image for frontend ===
FROM node:20-alpine AS runner

WORKDIR /app

# Enable PNPM again for production install (if needed)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only what's needed for runtime
COPY pnpm-lock.yaml package.json pnpm-workspace.yaml ./
COPY apps/dashboard/package.json ./apps/dashboard/

# Install production dependencies
WORKDIR /app/apps/dashboard
RUN pnpm install --prod --frozen-lockfile --ignore-scripts --shamefully-hoist

# Copy build output
COPY --from=builder /app/apps/dashboard/.next ./.next
COPY --from=builder /app/apps/dashboard/public ./public
COPY --from=builder /app/apps/dashboard/next.config.ts ./next.config.ts
COPY --from=builder /app/apps/dashboard/package.json ./package.json

# Set environment and expose port
ENV NODE_ENV=production
EXPOSE 3000

# Run the app
CMD ["npx", "next", "start"]
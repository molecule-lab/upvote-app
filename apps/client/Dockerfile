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
RUN pnpm install --frozen-lockfile

# Build only the frontend app
RUN pnpm turbo run build --filter=client

# === STAGE 2: Lightweight production image for frontend ===
FROM node:20-alpine AS runner

WORKDIR /app

# Enable PNPM again for production install
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy monorepo config files
COPY pnpm-lock.yaml package.json pnpm-workspace.yaml ./

# Copy dashboard app package.json
COPY apps/client/package.json ./apps/client/package.json

# Copy shared packages (needed for workspace resolution)
COPY packages ./packages

# Install production dependencies
RUN pnpm install --prod --frozen-lockfile

# Copy build output from builder stage
COPY --from=builder /app/apps/client/.next ./apps/client/.next
COPY --from=builder /app/apps/client/public ./apps/client/public
COPY --from=builder /app/apps/client/next.config.ts ./apps/client/next.config.ts
COPY --from=builder /app/apps/client/package.json ./apps/client/package.json

# Set working directory to the app
WORKDIR /app/apps/client

# Set environment and expose port
ENV NODE_ENV=production
EXPOSE 3000

# Run the app
CMD ["pnpm", "start"]
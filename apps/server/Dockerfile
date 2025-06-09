FROM node:20 AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy monorepo config (important!)
COPY pnpm-lock.yaml package.json pnpm-workspace.yaml turbo.json ./

# Copy source code
COPY apps ./apps
COPY packages ./packages

RUN pnpm install --frozen-lockfile --shamefully-hoist

RUN pnpm turbo run build --filter=@upvote-app/server...

# === STAGE 2: Create a lightweight production image ===
# === STAGE 2: Create a lightweight production image ===
FROM node:20 AS runner

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only necessary files for production
COPY pnpm-lock.yaml package.json pnpm-workspace.yaml ./

# Copy server source/package
COPY apps/server/package.json ./apps/server/

# Install only production deps for the app
WORKDIR /app/apps/server
RUN pnpm install --prod --frozen-lockfile --ignore-scripts --shamefully-hoist

# Copy compiled dist output
COPY --from=builder /app/apps/server/dist ./dist

# Set runtime environment and port
ENV NODE_ENV=production
EXPOSE 3000

# Start the server
CMD ["node", "dist/server.js"]
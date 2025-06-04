# Upvote App Server

Express.js server for the upvote application.

## Structure

```
src/
├── server.ts          # Main server entry point
├── app.ts            # Express app configuration and routing
├── routes/           # API route handlers
│   ├── index.ts      # Main routes export
│   ├── upvote.ts     # Upvote-related routes
│   └── user.ts       # User-related routes
├── middleware/       # Custom middleware
│   └── errorHandler.ts
├── types/           # TypeScript type definitions
│   └── index.ts
└── utils/           # Utility functions
    └── logger.ts
```

## Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Copy environment variables:

   ```bash
   cp env.example .env
   ```

3. Start development server:

   ```bash
   pnpm dev
   ```

4. Build for production:

   ```bash
   pnpm build
   ```

5. Start production server:
   ```bash
   pnpm start
   ```

## API Endpoints

### Health Check

- `GET /health` - Server health status

### API Info

- `GET /api` - API information and available endpoints

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Upvotes

- `GET /api/upvotes` - Get all upvotes
- `POST /api/upvotes` - Create new upvote
- `DELETE /api/upvotes/:id` - Remove upvote
- `GET /api/upvotes/item/:itemId` - Get upvotes for specific item

## Environment Variables

- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - CORS origin URL (default: http://localhost:3000)

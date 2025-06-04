import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { envVariables } from "./src/utils/app-config";

export default defineConfig({
  out: "./drizzle",
  schema: [
    "./src/db/users-schema.ts",
    "./src/db/tenants-schema.ts",
    "./src/db/data-schema.ts",
  ],
  dialect: "postgresql",
  dbCredentials: {
    url: envVariables.NEON_DB_POSTGRES_URL!,
  },
});

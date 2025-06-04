import { drizzle } from "drizzle-orm/node-postgres";
import * as usersSchema from "./users-schema";
import * as tenantSchema from "./tenants-schema";
import * as dataSchema from "./data-schema";
import { envVariables } from "../utils/app-config";
import { Pool } from "pg";

const sql = new Pool({ connectionString: envVariables.NEON_DB_POSTGRES_URL! });

export const neonDB = drizzle(sql, {
  schema: { ...usersSchema, ...tenantSchema, ...dataSchema },
});

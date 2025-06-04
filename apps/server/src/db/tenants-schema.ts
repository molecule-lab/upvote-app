import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";
import { generateSlug } from "random-word-slugs";
import { ulid } from "ulid";
import { users } from "./users-schema";
import { relations } from "drizzle-orm";

export const roleEnum = pgEnum("role_enum", ["admin", "user"]);

export const tenants = pgTable("tenants", {
  id: varchar("id", { length: 26 })
    .primaryKey()
    .$default(() => ulid()),
  name: text("name").notNull(),
  slug: text("slug")
    .notNull()
    .$default(() => generateSlug())
    .unique(),
  displayLogo: text("display_logo"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const userTenantsMapping = pgTable(
  "user_tenants_mapping",
  {
    id: varchar("id", { length: 26 })
      .primaryKey()
      .$default(() => ulid()),
    userId: varchar("user_id", { length: 26 })
      .notNull()
      .references(() => users.id),
    tenantId: varchar("tenants_id", { length: 26 })
      .notNull()
      .references(() => tenants.id),
    role: roleEnum("role").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    unique("user_tenant_role_unique").on(
      table.userId,
      table.tenantId,
      table.role
    ),
  ]
);

export const usersRelations = relations(users, ({ many }) => ({
  tenantMappings: many(userTenantsMapping),
}));

// tenants-schema.ts
export const tenantsRelations = relations(tenants, ({ many }) => ({
  userMappings: many(userTenantsMapping),
}));

export const userTenantsMappingRelations = relations(
  userTenantsMapping,
  ({ one }) => ({
    user: one(users, {
      fields: [userTenantsMapping.userId],
      references: [users.id],
    }),
    tenant: one(tenants, {
      fields: [userTenantsMapping.tenantId],
      references: [tenants.id],
    }),
  })
);

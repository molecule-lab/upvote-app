import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";
import { ulid } from "ulid";
import { users } from "./users-schema";
import { tenants } from "./tenants-schema";

export const categoryEnum = pgEnum("category_enum", [
  "idea",
  "issue",
  "feedback",
]);

export const statusEnum = pgEnum("status_enum", [
  "in-review",
  "in-progress",
  "completed",
  "declined",
]);

export const priorityEnum = pgEnum("priority_enum", [
  "low",
  "medium",
  "high",
  "urgent",
]);

export const requests = pgTable("requests", {
  id: varchar("id", { length: 26 })
    .primaryKey()
    .$default(() => ulid()),
  authoredBy: varchar("user_id", { length: 26 })
    .notNull()
    .references(() => users.id),
  tenantId: varchar("tenant_id", { length: 26 })
    .notNull()
    .references(() => tenants.id),
  title: text("title").notNull(),
  description: text("description"),
  category: categoryEnum("category").notNull(),
  status: statusEnum("status").notNull(),
  priority: priorityEnum("priority").notNull().default("medium"),
  isVisible: boolean("is_visible").notNull().default(true),
  isArchived: boolean("is_archived").notNull().default(false),
  isDeleted: boolean("is_deleted").notNull().default(false),
  source: text("source").notNull().default("client"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const votes = pgTable(
  "votes",
  {
    id: varchar("id", { length: 26 })
      .primaryKey()
      .$default(() => ulid()),
    votedBy: varchar("user_id", { length: 26 })
      .notNull()
      .references(() => users.id),
    tenantId: varchar("tenant_id", { length: 26 })
      .notNull()
      .references(() => tenants.id),
    requestId: varchar("request_id", { length: 26 })
      .notNull()
      .references(() => requests.id),
    source: text("source").notNull().default("client"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [unique().on(table.votedBy, table.requestId)]
);

export const changelog = pgTable("changelog", {
  id: varchar("id", { length: 26 })
    .primaryKey()
    .$default(() => ulid()),
  authoredBy: varchar("user_id", { length: 26 })
    .notNull()
    .references(() => users.id),
  tenantId: varchar("tenant_id", { length: 26 })
    .notNull()
    .references(() => tenants.id),
  coverImage: varchar("cover_image"),
  title: text("title"),
  description: text("description"),
  isVisible: boolean("is_visible").notNull().default(true),
  source: text("source").notNull().default("tenant-dashboard"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

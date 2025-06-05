import { relations } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { ulid } from "ulid";
import { tenants, userTenantsMapping } from "./tenants-schema";
import { changelog, requests, votes } from "./data-schema";

export const users = pgTable("users", {
  id: varchar("id", { length: 26 })
    .primaryKey()
    .$default(() => ulid()),
  firebaseUserId: text("firebase_user_id").unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: text("name"),
  displayPicture: text("display_picture"),
  isDeleted: boolean("is_deleted").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

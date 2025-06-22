import { InferSelectModel } from "drizzle-orm";
import { Request } from "express";
import { tenants, userTenantsMapping } from "src/db/tenants-schema";
import { users } from "src/db/users-schema";
type User = InferSelectModel<typeof users>;
type TenantMapping = InferSelectModel<typeof userTenantsMapping>;
type Tenant = InferSelectModel<typeof tenants>;
export type UserWithRelations = User & {
  tenantMappings: (TenantMapping & { tenant: Tenant })[];
};

export type AuthRequest = {
  user?: UserWithRelations;
  tenantId?: string;
} & Request;

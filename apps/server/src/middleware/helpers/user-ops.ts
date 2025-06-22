import { and, eq } from "drizzle-orm";
import { neonDB } from "src/db/neon-db";
import { userTenantsMapping } from "src/db/tenants-schema";
import { users } from "src/db/users-schema";

const getUser = async ({
  email,
  firebaseUserId,
  role,
}: {
  email: string;
  firebaseUserId: string;
  role: "admin" | "user";
}) => {
  return await neonDB.query.users.findFirst({
    where: and(
      eq(users.email, email),
      eq(users.firebaseUserId, firebaseUserId)
    ),
    with: {
      tenantMappings: {
        where: eq(userTenantsMapping.role, role),
        with: {
          tenant: true,
        },
      },
    },
  });
};

const getUserWithSpecificTenant = async ({
  email,
  firebaseUserId,
  role,
  tenantId,
}: {
  email: string;
  firebaseUserId: string;
  role: "admin" | "user";
  tenantId: string;
}) => {
  return await neonDB.query.users.findFirst({
    where: and(
      eq(users.email, email),
      eq(users.firebaseUserId, firebaseUserId)
    ),
    with: {
      tenantMappings: {
        where: and(
          eq(userTenantsMapping.role, role),
          eq(userTenantsMapping.tenantId, tenantId)
        ),
        with: {
          tenant: true,
        },
      },
    },
  });
};

const getUserFromEmail = async ({
  email,
  role,
  tenantId,
}: {
  email: string;
  role: "admin" | "user";
  tenantId: string;
}) => {
  return await neonDB.query.users.findFirst({
    where: eq(users.email, email),
    with: {
      tenantMappings: {
        where: and(
          eq(userTenantsMapping.role, role),
          eq(userTenantsMapping.tenantId, tenantId)
        ),
        with: {
          tenant: true,
        },
      },
    },
  });
};

export { getUser, getUserWithSpecificTenant, getUserFromEmail };

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";
import * as authSchema from "./auth-schema";

/**
 * Neon serverless (HTTP) Drizzle client.
 *
 * A placeholder URL is used when DATABASE_URL is unset so the module can be
 * imported during `next build` without secrets. No network call is made until a
 * query runs, so set DATABASE_URL before using the app at runtime.
 */
const connectionString =
  process.env.DATABASE_URL ?? "postgresql://user:password@localhost:5432/db";

const sql = neon(connectionString);

export const db = drizzle(sql, { schema: { ...schema, ...authSchema } });

export { schema, authSchema };

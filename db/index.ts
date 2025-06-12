if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { drizzle as neonDrizzle } from "drizzle-orm/neon-http";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { drizzle as postgresDrizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

let db: NeonHttpDatabase<typeof schema> | PostgresJsDatabase<typeof schema>;

if (
  process.env.NODE_ENV === "production" &&
  process.env.DATABASE_URL?.includes("neon.tech")
) {
  // Use Neon in production
  db = neonDrizzle(process.env.DATABASE_URL, { schema });
} else {
  // Cache the connection in development to avoid multiple connections during HMR
  const globalForDb = globalThis as unknown as {
    conn: ReturnType<typeof postgres> | undefined;
  };
  const conn = globalForDb.conn ?? postgres(process.env.DATABASE_URL!);
  if (!globalForDb.conn) globalForDb.conn = conn;

  db = postgresDrizzle(conn, { schema });
}

export { db };

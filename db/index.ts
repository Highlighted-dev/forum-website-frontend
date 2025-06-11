import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

export const db: ReturnType<typeof drizzle<typeof schema>> = drizzle(
  process.env.DATABASE_URL,
  { schema: schema },
);

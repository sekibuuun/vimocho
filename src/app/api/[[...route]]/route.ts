import type { D1Database } from "@cloudflare/workers-types"
import { drizzle } from "drizzle-orm/d1"
import { Hono } from "hono"
import { handle } from "hono/vercel"
import { users } from "../../../../schema"

export const runtime = "edge"

// This ensures c.env.DB is correctly typed
type Bindings = {
  DB: D1Database
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB: D1Database
    }
  }
}

const app = new Hono<{ Bindings: Bindings }>().basePath("/api")

// Accessing D1 is via the c.env.YOUR_BINDING property
app.get("/query/customers", async (c) => {
  const { results } = await process.env.DB.prepare(
    "SELECT * FROM customers"
  ).all()
  return c.json(results)
})

/**
 * get users
 */
app.get("/users", async (c) => {
  const db = drizzle(process.env.DB)
  const result = await db.select().from(users).all()
  return c.json(result)
})

/**
 * create users
 */
app.post("/users", async (c) => {
  const params = await c.req.json<typeof users.$inferSelect>()
  const db = drizzle(process.env.DB)
  const result = await db
    .insert(users)
    .values({
      userName: params.userName
    })
    .execute()
  return c.json(result)
})

export const GET = handle(app)
export const POST = handle(app)

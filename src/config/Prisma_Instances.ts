// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// 1️⃣ Hardcoded database URL
const DATABASE_URL = "postgresql://neondb_owner:npg_z9NYUtHXb2qM@ep-blue-glade-a1vi91y7-pooler.ap-southeast-1.aws.neon.tech:5432/neondb?sslmode=require&channel_binding=require&connect_timeout=30";

// 2️⃣ Create a Postgres pool
const pool = new Pool({
  connectionString: DATABASE_URL,
});

// 3️⃣ Adapter for PrismaClient
const adapter = new PrismaPg(pool);

// 4️⃣ Instantiate PrismaClient with adapter
// src/lib/prisma.ts

const prisma = new PrismaClient();

export default prisma

// 5️⃣ Optional: test connection


// Uncomment to test
// main();


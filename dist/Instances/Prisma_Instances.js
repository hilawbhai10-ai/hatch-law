import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_z9NYUtHXb2qM@ep-blue-glade-a1vi91y7-pooler.ap-southeast-1.aws.neon.tech:5432/neondb?sslmode=require&channel_binding=require&connect_timeout=30",
});
const adapter = new PrismaPg(pool);
const Prisma_Instances = new PrismaClient({
    adapter,
});
export default Prisma_Instances;
//# sourceMappingURL=Prisma_Instances.js.map
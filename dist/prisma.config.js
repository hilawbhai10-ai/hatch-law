import { defineConfig } from "prisma/config";
export default defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
    },
    datasource: {
        url: "postgresql://neondb_owner:npg_z9NYUtHXb2qM@ep-blue-glade-a1vi91y7-pooler.ap-southeast-1.aws.neon.tech:5432/neondb?sslmode=require&channel_binding=require&connect_timeout=30",
    },
});
//# sourceMappingURL=prisma.config.js.map
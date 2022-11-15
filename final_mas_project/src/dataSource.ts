import "reflect-metadata";
import { DataSource } from "typeorm";

/**
 * DataSource data for database connection
 */
export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "admin",
  database: "postgres",
  schema: "pcbuilding",
  logging: false,
  synchronize: true,
  entities: ["src/models/**/*.{ts,js}"],
  migrations: ["src/dataMigration/**/*.{ts,js}"],
  subscribers: ["src/subscriber/**/*.{ts,js}"],
});

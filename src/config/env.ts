import * as dotenv from "dotenv";
import path from "path";

const env = process.env.TEST_ENV || "dev";
dotenv.config({ path: path.resolve(__dirname, `../../.env.${env}`) });

export const config = {
  baseUrl: process.env.BASE_URL!,
  apiBaseUrl: process.env.API_BASE_URL!,
  db: {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT),
    name: process.env.DB_NAME!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
  },
};

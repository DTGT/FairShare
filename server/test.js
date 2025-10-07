import dotenv from "dotenv";
import path from "path";

// Load .env manually
const envPath = path.resolve(process.cwd(), ".env");
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error("Failed to load .env:", result.error);
} else {
  console.log("Loaded .env from:", envPath);
  console.log("DATABASE_URL =", process.env.DATABASE_URL);
}

import { DatabaseStorage } from "./storage-db";
import { SimpleMemoryStorage } from "./storage-simple";

// Create storage instance based on environment
let storageInstance: DatabaseStorage | SimpleMemoryStorage;

if (process.env.DATABASE_URL) {
  console.log("Using PostgreSQL database storage");
  storageInstance = new DatabaseStorage();
} else {
  console.log("DATABASE_URL not found, using in-memory storage");
  storageInstance = new SimpleMemoryStorage();
}

export const storage = storageInstance;
export * from "./storage-db";
export * from "./storage-simple";
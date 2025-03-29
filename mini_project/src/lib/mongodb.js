import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // Ensure this is set in .env.local
const options = {};

let client;
let clientPromise;

if (!uri) {
  throw new Error("⚠️ Missing MONGODB_URI in environment variables");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

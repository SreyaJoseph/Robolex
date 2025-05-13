import { MongoClient } from 'mongodb';

// Use environment variables for security
const client = new MongoClient(process.env.MONGODB_URI);

let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development mode, we use a global variable to ensure we don't repeatedly create a new MongoDB connection
  if (global._mongoClientPromise) {
    clientPromise = global._mongoClientPromise;
  } else {
    clientPromise = client.connect();
    global._mongoClientPromise = clientPromise;
  }
} else {
  // In production, use the direct promise from client.connect()
  clientPromise = client.connect();
}

export default clientPromise;

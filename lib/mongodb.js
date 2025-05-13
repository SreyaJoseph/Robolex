import { MongoClient } from 'mongodb';

// Initialize MongoDB client
const client = new MongoClient(process.env.MONGODB_URI);

// Declare clientPromise to manage the MongoDB connection
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // For development, use a global variable to prevent new connections on every refresh
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, directly return the promise for client connection
  clientPromise = client.connect();
}

export default clientPromise;

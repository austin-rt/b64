import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// After the check, we know MONGODB_URI is defined
const uri = MONGODB_URI as string;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  isConnecting: boolean;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose || {
  conn: null,
  promise: null,
  isConnecting: false,
};

if (!global.mongoose) {
  global.mongoose = cached;
}

const connectOptions: mongoose.ConnectOptions = {
  bufferCommands: false,
  maxPoolSize: 10,
  minPoolSize: 5,
  socketTimeoutMS: 45000,
  family: 4,
  serverSelectionTimeoutMS: 5000,
  heartbeatFrequencyMS: 10000,
};

const connectDB = async (): Promise<typeof mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (cached.isConnecting) {
    throw new Error("Connection already in progress");
  }

  if (!cached.promise) {
    cached.isConnecting = true;

    cached.promise = mongoose
      .connect(uri, connectOptions)
      .then((mongoose) => {
        console.log("MongoDB connected successfully");
        return mongoose;
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error);
        cached.promise = null;
        cached.isConnecting = false;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    cached.isConnecting = false;
    throw error;
  } finally {
    cached.isConnecting = false;
  }

  // Add connection event listeners
  mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
  });

  mongoose.connection.on("reconnected", () => {
    console.info("MongoDB reconnected");
  });

  return cached.conn;
};

export default connectDB;

import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.CONN_STRING) {
      throw new Error("Missing CONN_STRING in environment variables");
    }
    await mongoose.connect(process.env.CONN_STRING);
    console.log(`Connected to MongoDB: ${mongoose.connection.host}`);
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error connecting to MongoDB: ${err.message}`);
    } else {
      console.error("Unknown error connecting to MongoDB");
    }
    process.exit(1);
  }
};

export default connectDB;

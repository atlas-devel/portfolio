import prisma from "./prisma";

const connectDB = async (): Promise<void> => {
  try {
    if (!process.env.POSTGRESQL_URL) {
      throw new Error("Missing POSTGRESQL_URL in environment variables");
    }
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    console.log("Connected to PostgreSQL");
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error connecting to PostgreSQL: ${err.message}`);
    } else {
      console.error("Unknown error connecting to PostgreSQL");
    }
    process.exit(1);
  }
};

export default connectDB;

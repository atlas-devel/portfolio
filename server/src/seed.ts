import "dotenv/config";
import prisma from "./config/prisma";
import { hashPassword } from "./utils/password";

const seedAdmin = async (): Promise<void> => {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password || password.length < 12) {
    throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD (at least 12 characters).");
  }

  const hashedPassword = await hashPassword(password);
  await prisma.admin.upsert({
    where: { email },
    create: { email, password: hashedPassword },
    update: { password: hashedPassword },
  });
  console.log(`Seeded admin ${email}.`);
};

seedAdmin()
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

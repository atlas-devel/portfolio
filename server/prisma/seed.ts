import "dotenv/config";
import prisma from "../src/config/prisma";
import { hashPassword } from "../src/utils/password";

const seedAdmin = async (): Promise<void> => {
  const email = "irakaramale@gmail.com".trim().toLowerCase();
  const password = "Leon@2022";
  if (!email || !password || password.length < 8) {
    throw new Error("Set admin email and password (at least 8 characters).");
  }

  const existing = await prisma.admin.findUnique({ where: { email } });
  if (existing) {
    console.log(
      `Admin ${email} already exists; leaving its password unchanged.`,
    );
    return;
  }

  await prisma.admin.create({
    data: { email, password: await hashPassword(password) },
  });
  console.log(`Created admin ${email}.`);
};

seedAdmin()
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
  })
  .finally(() => prisma.$disconnect());

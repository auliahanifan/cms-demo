import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/auth/password";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@example.com";
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const passwordHash = await hashPassword("Admin123!");
    await prisma.user.create({
      data: {
        name: "Administrator",
        email: adminEmail,
        passwordHash,
        role: "ADMIN",
      },
    });
    console.log("Admin user created: admin@example.com / Admin123!");
  } else {
    console.log("Admin user already exists, skipping.");
  }

  const categories = ["Teknologi", "Tutorial", "Berita"];
  for (const name of categories) {
    const slug = name.toLowerCase();
    await prisma.category.upsert({
      where: { slug },
      update: {},
      create: { name, slug },
    });
  }

  const tags = ["Next.js", "React", "CMS"];
  for (const name of tags) {
    const slug = name.toLowerCase().replace(/\./g, "");
    await prisma.tag.upsert({
      where: { slug },
      update: {},
      create: { name, slug },
    });
  }

  console.log("Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

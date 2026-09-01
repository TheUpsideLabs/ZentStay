import prisma from "../config/prisma";

import { seedAdmin, seedStudent } from "./admin.seed";
import { seedColleges } from "./college.seed";
import { seedProperties } from "./property.seed";

async function seed() {
  try {
    console.log("");

    console.log("🚀 ZentStay Seeder");

    console.log("");

    await seedAdmin();

    await seedStudent();

    await seedColleges();

    await seedProperties();

    console.log("");

    console.log("🎉 Database Ready.");

    console.log("");

    await prisma.$disconnect();
  } catch (error) {
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  }
}

seed();
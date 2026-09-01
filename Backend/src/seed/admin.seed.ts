import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import { Role } from "@prisma/client";

export async function seedAdmin() {
  const email = "admin@zentstay.com";

  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (exists) {
    console.log("✅ Admin already exists.");
    return exists;
  }

  const password = await bcrypt.hash(
    "Admin@123",
    12
  );

  const admin = await prisma.user.create({
    data: {
      name: "ZentStay Admin",

      email,

      password,

      role: Role.ADMIN,

      isVerified: true,
    },
  });

  console.log("✅ Admin Seeded");

  return admin;
}

export async function seedStudent() {
  const email = "student@zentstay.com";

  const password = await bcrypt.hash("Student@123", 12);

  const student = await prisma.user.upsert({
    where: { email },
    update: {
      password,
      isVerified: true,
      role: Role.STUDENT,
    },
    create: {
      name: "Demo Student",
      email,
      password,
      role: Role.STUDENT,
      isVerified: true,
      phone: "9876543210",
    },
  });

  console.log("✅ Demo Student Seeded:", student.email);
  return student;
}
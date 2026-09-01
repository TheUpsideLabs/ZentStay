const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.college.findMany().then(c => {
  console.log("COLLEGES IN DB:", c.length);
  console.log(JSON.stringify(c, null, 2));
}).finally(() => prisma.$disconnect());

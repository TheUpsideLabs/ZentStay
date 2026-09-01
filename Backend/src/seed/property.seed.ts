import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import {
  Role,
  Gender,
  RoomType,
  Furnishing,
} from "@prisma/client";

export async function seedProperties() {
  const password = await bcrypt.hash(
    "Owner@123",
    12
  );

  const colleges = await prisma.college.findMany();

  if (colleges.length === 0) {
    console.log("❌ No colleges found.");
    return;
  }

  let ownerIndex = 1;

  for (const college of colleges) {
    const ownerEmail = `owner${ownerIndex}@zentstay.com`;

    let owner = await prisma.user.findUnique({
      where: {
        email: ownerEmail,
      },
    });

    if (!owner) {
      owner = await prisma.user.create({
        data: {
          name: `${college.shortName} Owner`,

          email: ownerEmail,

          password,

          role: Role.OWNER,

          isVerified: true,
        },
      });

      console.log(
        `✅ Owner Created : ${owner.email}`
      );
    }

    const properties = [
      {
        title: `${college.shortName} Premium PG`,

        description:
          "Premium furnished PG with AC, WiFi, Laundry and Food.",

        address:
          `${college.shortName} Gate No.1`,

        rent: 8500,
      },

      {
        title: `${college.shortName} Student Residency`,

        description:
          "Affordable PG for engineering students.",

        address:
          `${college.shortName} Gate No.2`,

        rent: 7200,
      },

      {
        title: `${college.shortName} Elite Hostel`,

        description:
          "Luxury Hostel near campus.",

        address:
          `${college.shortName} Main Road`,

        rent: 9800,
      },
    ];

    for (const item of properties) {
      const exists =
        await prisma.property.findFirst({
          where: {
            title: item.title,
          },
        });

      if (!exists) {
        await prisma.property.create({
          data: {
            ownerId: owner.id,

            collegeId: college.id,

            title: item.title,

            description: item.description,

            address: item.address,

            city: college.city,

            state: college.state,

            pincode: "201009",

            rent: item.rent,

            securityDeposit: 5000,

            availableRooms: 8,

            gender: Gender.UNISEX,

            roomType: RoomType.DOUBLE,

            furnishing:
              Furnishing.FURNISHED,

            available: true,
          },
        });

        console.log(
          `🏠 ${item.title} Added`
        );
      }
    }

    ownerIndex++;
  }

  console.log(
    "🎉 Property Seeder Completed."
  );
}
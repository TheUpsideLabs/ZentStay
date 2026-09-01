import prisma from "../config/prisma";

export async function seedColleges() {
  const colleges = [
    {
      name: "Ajay Kumar Garg Engineering College",
      shortName: "AKGEC",
      slug: "akgec",

      city: "Ghaziabad",

      state: "Uttar Pradesh",

      logo:
        "https://akgec.ac.in/wp-content/uploads/2022/06/logo.png",

      banner:
        "https://images.unsplash.com/photo-1562774053-701939374585",

      latitude: 28.6752,

      longitude: 77.5021,

      rating: 4.7,
    },

    {
      name: "KIET Group of Institutions",

      shortName: "KIET",

      slug: "kiet",

      city: "Ghaziabad",

      state: "Uttar Pradesh",

      logo:
        "https://www.kiet.edu/images/logo.png",

      banner:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",

      latitude: 28.7536,

      longitude: 77.4958,

      rating: 4.6,
    },

    {
      name: "ABES Engineering College",

      shortName: "ABES",

      slug: "abes",

      city: "Ghaziabad",

      state: "Uttar Pradesh",

      logo:
        "https://abes.ac.in/images/logo.png",

      banner:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f",

      latitude: 28.6345,

      longitude: 77.4498,

      rating: 4.5,
    },

    {
      name: "GL Bajaj Institute of Technology",

      shortName: "GL Bajaj",

      slug: "gl-bajaj",

      city: "Greater Noida",

      state: "Uttar Pradesh",

      logo:
        "https://www.glbitm.org/images/logo.png",

      banner:
        "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a",

      latitude: 28.4744,

      longitude: 77.504,

      rating: 4.6,
    },

    {
      name: "IMS Ghaziabad",

      shortName: "IMS",

      slug: "ims",

      city: "Ghaziabad",

      state: "Uttar Pradesh",

      logo:
        "https://www.ims-ghaziabad.ac.in/images/logo.png",

      banner:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",

      latitude: 28.6735,

      longitude: 77.4456,

      rating: 4.4,
    },
  ];

  for (const college of colleges) {
    const exists =
      await prisma.college.findUnique({
        where: {
          slug: college.slug,
        },
      });

    if (!exists) {
      await prisma.college.create({
        data: college,
      });

      console.log(
        `✅ ${college.shortName} Added`
      );
    }
  }

  console.log("🎉 College Seeder Completed");
}
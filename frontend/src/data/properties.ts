import { Property } from "@/types/property";

export const properties: Property[] = [
  {
    id: "1",
    name: "Urban Nest PG",
    location: "AKGEC",
    collegeSlug: "akgec",
    distance: "650m",
    image: "/images/properties/property-1.jpeg",
    price: 8500,
    rating: 4.9,
    views: 1234,
    verified: true,
    amenities: ["WiFi", "AC", "Food", "Laundry"],
    description:
      "Modern PG with furnished rooms, healthy meals, housekeeping, CCTV security and high-speed WiFi near AKGEC.",
  },

  {
    id: "2",
    name: "Campus Residency",
    location: "ABES Engineering College",
    collegeSlug: "abes",
    distance: "900m",
    image: "/images/properties/property-2.jpeg",
    price: 7800,
    rating: 4.8,
    views: 954,
    verified: true,
    amenities: ["WiFi", "Parking", "Food"],
    description:
      "Comfortable PG offering spacious rooms, delicious food, WiFi and secure parking close to ABES.",
  },

  {
    id: "3",
    name: "Scholars Stay",
    location: "KIET",
    collegeSlug: "kiet",
    distance: "500m",
    image: "/images/properties/property-3.jpeg",
    price: 9200,
    rating: 4.7,
    views: 876,
    verified: true,
    amenities: ["WiFi", "AC", "Laundry"],
    description:
      "Premium student accommodation with AC rooms, laundry service and study-friendly environment near KIET.",
  },

  {
    id: "4",
    name: "Blue Leaf PG",
    location: "GL Bajaj",
    collegeSlug: "gl-bajaj",
    distance: "1.2 km",
    image: "/images/properties/property-4.jpeg",
    price: 7000,
    rating: 4.6,
    views: 645,
    verified: false,
    amenities: ["Food", "Parking"],
    description:
      "Affordable PG with clean rooms, healthy meals and parking facility for students near GL Bajaj.",
  },

  {
    id: "5",
    name: "Prime Living",
    location: "AKGEC",
    collegeSlug: "akgec",
    distance: "450m",
    image: "/images/properties/property-5.jpeg",
    price: 9800,
    rating: 5.0,
    views: 1650,
    verified: true,
    amenities: ["WiFi", "AC", "Food", "Laundry"],
    description:
      "Luxury PG featuring premium rooms, unlimited WiFi, AC, housekeeping and nutritious meals near AKGEC.",
  },

  {
    id: "6",
    name: "City Boys PG",
    location: "IMS",
    collegeSlug: "ims",
    distance: "700m",
    image: "/images/properties/property-6.jpeg",
    price: 7500,
    rating: 4.5,
    views: 552,
    verified: false,
    amenities: ["WiFi", "Food"],
    description:
      "Budget-friendly boys PG with WiFi, fresh meals and comfortable rooms close to IMS Engineering College.",
  },
];
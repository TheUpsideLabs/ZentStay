export interface College {
  id: string;
  slug: string;

  name: string;

  shortName: string;

  city: string;

  state: string;

  logo: string;

  banner: string;

  latitude: number;

  longitude: number;

  totalProperties: number;

  studentCount: number;

  rating: number;

  popular: boolean;

  website?: string;

  established?: number;

  nirfRank?: number;
}

export const colleges: College[] = [
 {
  id: "1",
  slug: "akgec",

  name: "Ajay Kumar Garg Engineering College",

  shortName: "AKGEC",

  city: "Ghaziabad",

  state: "Uttar Pradesh",

  logo: "/images/colleges/logo/akgec.webp",

  banner: "/images/colleges/banners/akgec.png",

  latitude: 28.676,

  longitude: 77.503,

  totalProperties: 248,

  studentCount: 6500,

  rating: 4.8,

  website: "https://www.akgec.ac.in",

  popular: true,
}

,{
    id: "2",
    slug: "abes",
    name: "ABES Engineering College",
    shortName: "ABES",
    city: "Ghaziabad",
    state: "Uttar Pradesh",
    logo: "/images/colleges/abes.png",
    banner: "/images/colleges/banners/abes.jpg",
    latitude: 28.6349,
    longitude: 77.4499,
    totalProperties: 196,
    studentCount: 7200,
    rating: 4.6,
    popular: true,
  },

  {
    id: "3",
    slug: "kiet",
    name: "KIET Group of Institutions",
    shortName: "KIET",
    city: "Ghaziabad",
    state: "Uttar Pradesh",
    logo: "/images/colleges/kiet.png",
    banner: "/images/colleges/banners/kiet.jpg",
    latitude: 28.7534,
    longitude: 77.4959,
    totalProperties: 224,
    studentCount: 8000,
    rating: 4.7,
    popular: true,
  },

  {
    id: "4",
    slug: "gl-bajaj",
    name: "GL Bajaj Institute of Technology and Management",
    shortName: "GL Bajaj",
    city: "Greater Noida",
    state: "Uttar Pradesh",
    logo: "/images/colleges/glbajaj.png",
    banner: "/images/colleges/banners/glbajaj.jpg",
    latitude: 28.4746,
    longitude: 77.504,
    totalProperties: 312,
    studentCount: 9000,
    rating: 4.8,
    popular: true,
  },

  {
    id: "5",
    slug: "ims",
    name: "IMS Engineering College",
    shortName: "IMS",
    city: "Ghaziabad",
    state: "Uttar Pradesh",
    logo: "/images/colleges/ims.png",
    banner: "/images/colleges/banners/ims.jpg",
    latitude: 28.676,
    longitude: 77.445,
    totalProperties: 108,
    studentCount: 4200,
    rating: 4.4,
    popular: true,
  },
];
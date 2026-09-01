import { properties } from "@/data/properties";

export class PropertyService {
  static getAll() {
    return properties;
  }

  static getByCollege(college: string) {
    return properties.filter((property) =>
      property.location
        .toLowerCase()
        .includes(college.toLowerCase())
    );
  }
}
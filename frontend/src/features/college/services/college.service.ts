import { colleges } from "@/data/colleges";

export class CollegeService {
  static getAll() {
    return colleges;
  }

  static search(query: string) {
    return colleges.filter((college) =>
      college.name
        .toLowerCase()
        .includes(query.toLowerCase()) ||
      college.shortName
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }
}
import collegeRepository from "../repositories/college.repository";

import {
  CreateCollegeDTO,
  UpdateCollegeDTO,
} from "../interfaces/college.interface";

import { AppError } from "../utils/AppError";

class CollegeService {
  async createCollege(data: CreateCollegeDTO) {
    const exists = await collegeRepository.findBySlug(data.slug);

    if (exists) {
      throw new AppError(
        409,
        "College already exists."
      );
    }

    return collegeRepository.create(data);
  }

  async getAllColleges(filters: {
    search?: string;
    pincode?: string;
    state?: string;
    city?: string;
    lat?: number;
    lng?: number;
    radius?: number;
    popular?: boolean;
    page?: number;
    limit?: number;
  } = {}) {
    return collegeRepository.findAll(filters);
  }

  async getCollegeById(id: string) {
    const college =
      await collegeRepository.findById(id);

    if (!college) {
      throw new AppError(
        404,
        "College not found."
      );
    }

    return college;
  }

  async getCollegeBySlug(slug: string) {
    const college =
      await collegeRepository.findBySlug(slug);

    if (!college) {
      throw new AppError(
        404,
        "College not found."
      );
    }

    return college;
  }

  async updateCollege(
    id: string,
    data: UpdateCollegeDTO
  ) {
    await this.getCollegeById(id);

    return collegeRepository.update(id, data);
  }

  async deleteCollege(id: string) {
    await this.getCollegeById(id);

    return collegeRepository.delete(id);
  }
}

export default new CollegeService();
import { Role } from "@prisma/client";
import adminRepository from "../repositories/admin.repository";
import { AppError } from "../utils/AppError";

class AdminService {
  async getDashboard(role: Role) {
    if (role !== Role.ADMIN) {
      throw new AppError(
        403,
        "Only admins can access dashboard."
      );
    }

    return adminRepository.getDashboardStats();
  }

  async getAllUsers(role: Role) {
    if (role !== Role.ADMIN) {
      throw new AppError(403, "Only admins can view users.");
    }
    return adminRepository.getAllUsers();
  }
}

export default new AdminService();
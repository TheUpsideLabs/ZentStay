import { api } from "@/lib/api";

export const getAllProperties = async () => {
  const response = await api.get("/properties");

  return response.data;
};
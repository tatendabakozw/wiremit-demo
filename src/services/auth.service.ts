import apiClient from "@/lib/api-client";
import { handleApiError } from "@/utils/handleApiError";

export async function register(payload: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  try {
    const res = await apiClient.post("/api/auth/register", payload);
    return res.data;
  } catch (error: any) {
    handleApiError(error);
  }
}

export async function login(payload: {
  email: string;
  password: string;
  rememberMe?: boolean;
}) {
  try {
    const res = await apiClient.post("/api/auth/login", payload);
    return res.data;
  } catch (error: any) {
    handleApiError(error);
  }
}

export async function logout() {
  try {
    const res = await apiClient.post("/api/auth/logout");
    return res.data;
  } catch (error: any) {
    handleApiError(error);
  }
}

/**
 * Normalizes Axios errors into a standard format and rethrows.
 */


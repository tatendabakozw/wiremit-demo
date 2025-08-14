// src/lib/logout.ts

import { ROUTES } from "@/config/routes";
import apiClient from "./api-client";

export async function logout() {
  try {
    await apiClient.post("/api/auth/logout");
    // Optionally clear any client-side state (Redux, Zustand, React Context)
    if (typeof window !== "undefined") {
      window.location.href = ROUTES.AUTH.LOGIN; // Redirect to login after logout
    }
  } catch (err: any) {
    console.error("Logout failed", err.response?.data || err.message);
  }
}

// src/services/userService.ts

import apiClient from "@/lib/api-client";

export async function getCurrentUser() {
  const res = await apiClient.get("/api/auth/me");
  return res.data;
}

export async function updateUser(payload: {
  firstName?: string;
  lastName?: string;
  email?: string;
}) {
  const res = await apiClient.put("/api/user", payload);
  return res.data;
}

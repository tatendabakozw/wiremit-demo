import { ROUTES } from "@/config/routes";
import axios from "axios";

// Create instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "", // empty means same origin
  withCredentials: true, // <-- send cookies (auth_token) with requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (attach headers if needed)
apiClient.interceptors.request.use(
  async (config) => {
    // Example: add Authorization header if you decide to use Bearer tokens instead of cookies
    // const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    // if (token) config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (global error handling)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle 401 Unauthorized globally
      if (error.response.status === 401) {
        console.warn("Unauthorized, redirecting to login...");
        if (typeof window !== "undefined") {
          window.location.href = ROUTES.AUTH.LOGIN + `?next=${encodeURIComponent(window.location.pathname)}`;
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

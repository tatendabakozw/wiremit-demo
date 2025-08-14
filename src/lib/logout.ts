import { ROUTES } from "@/config/routes";
import { logout } from "@/services/auth.service";

export async function handleLogout() {
  await logout();
  window.location.href = ROUTES.AUTH.LOGIN + `?next=${encodeURIComponent(window.location.pathname)}`;
}


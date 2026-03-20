import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "alexiant_admin";

export async function isAdminRequest() {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_COOKIE_NAME)?.value === "1";
}

export function getAdminCookieName() {
  return ADMIN_COOKIE_NAME;
}


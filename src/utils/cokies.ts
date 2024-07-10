import Cookies from "js-cookie";

export function setCookie(
  name: string,
  value: string,
  options?: Cookies.CookieAttributes,
) {
  Cookies.set(name, value, {
    expires: 7,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    ...options,
  });
}

// Function to get a cookie
export function getCookie(name: string): string | undefined {
  return Cookies.get(name);
}

// Function to delete a cookie
export function deleteCookie(name: string) {
  Cookies.remove(name);
}

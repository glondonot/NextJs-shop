import { NextRequest, NextResponse } from "next/server";

export const CART_COOKIE_NAME = "shopping_cart_v1";

export function parseCookies(req: NextRequest): Record<string, string> {
  const cookieHeader = req.headers.get("cookie");
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(";").forEach((c) => {
    const [k, ...v] = c.trim().split("=");
    cookies[k] = decodeURIComponent(v.join("="));
  });
  return cookies;
}

export function createCookieResponse(
  data: any,
  cartData: any,
  name: string,
  maxAgeSeconds = 60 * 60 * 24 * 7
) {
  return new NextResponse(JSON.stringify(data), {
    headers: {
      "Set-Cookie": `${name}=${encodeURIComponent(
        JSON.stringify(cartData)
      )}; Path=/; SameSite=Lax; Max-Age=${maxAgeSeconds}`,
      "Content-Type": "application/json",
    },
  });
}
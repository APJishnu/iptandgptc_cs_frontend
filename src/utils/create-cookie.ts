import { serialize } from "cookie";
import { NextResponse } from "next/server";

const isProduction = process.env.NODE_ENV === "production";
const domain = isProduction ? process.env.COOKIE_DOMAIN : ".localhost";

export function setCookie(response: NextResponse, token: string) {
  const cookie = serialize("admin_token", token, {
    httpOnly: true, // Prevents client-side access
    secure: isProduction, // Only secure in production
    path: "/",
    sameSite: "none", // Allows cross-origin requests
    domain: domain, // Set domain properly
  });

  response.headers.set("Set-Cookie", cookie);
  return response;
}

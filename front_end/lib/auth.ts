"use server";
import axios from "axios";
import { cookies } from "next/headers";

export async function setAuthToken(token: string) {
  (await cookies()).set("access-token", token, {
    httpOnly: true, // Prevents client-side JavaScript from reading the cookie
    secure: process.env.NODE_ENV === "production", // Only sent over HTTPS in production
    maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (e.g., 1 day)
    path: "/", // Available across the entire site
    sameSite: "strict", // Provides CSRF protection
  });
}

export async function getAuthToken() {
  const token = (await cookies()).get("access-token")?.value;

  if (!token) return null;
  return token;
}

export async function fetchProfile() {
  const authToken = await getAuthToken();
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/me?authToken=${authToken}`
  );
  console.log(res);
}

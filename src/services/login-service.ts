"use server";
import { generateJWT } from "../lib/auth";
import { cookies } from "next/headers";

export async function setTokenCookie(username: string, password: string) {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  try {
    cookies().set("access_token", generateJWT(username, password), {
      // expires: date,
    });
  } catch (error) {
    console.log("error", error);
  }

  return;
}

export async function getTokenCookie() {
  try {
    const cookie = cookies().get("access_token");
    return cookie.value;
  } catch (error) {
    return null;
  }
}

export async function deleteCookie() {
  try {
    cookies().delete("access_token");
  } catch (error) {
    console.log("error", error);
  }

  return;
}

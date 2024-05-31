"use server";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  //const url = request.nextUrl.clone();

  try {
    const token = request.cookies.get("access_token");

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch (e) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/users", "/businessCards"],
};

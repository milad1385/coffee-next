import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const response = NextResponse.next();
  const accessToken = cookies().get("accessToken")?.value;
  const refreshToken = cookies().get("refreshToken")?.value;

  const res = await fetch(`http://localhost:3000/api/auth/me`, {
    headers: {
      Authorization: `${accessToken}`,
    },
  });

  const userInfo = await res.json();

  // handle protection for api
  if (
    request.method !== "GET" &&
    request.nextUrl.pathname.startsWith("/api/product")
  ) {
    if (userInfo.role !== "ADMIN") {
      throw new Error("this route is forbbiden :(");
    }
  }

  // handle refresh Token
  if (res.status === 401) {
    const refresh = await fetch(`http://localhost:3000/api/auth/refresh`, {
      headers: {
        Authorization: `${refreshToken}`,
      },
    });
    if (refresh.status === 200) {
      const info = await refresh.json();
      response.cookies.set("accessToken", info.cookie, {
        httpOnly: true,
        path: "/",
        maxAge: 15,
      });
    }
  }
  NextResponse.redirect(new URL(request.url, request.url));
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/:path*"],
};

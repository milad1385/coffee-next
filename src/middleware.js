import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function middleware(request) {
  const path = request.nextUrl.pathname;

  const skipPaths = [
    "/_next",
    "/favicon.ico",
    "/images",
    "/fonts",
    "/manifest.json",
    "/sw.js",
    "/workbox-",
    "/coffee-icon",
    "/api/auth/signin",
    "/api/auth/signup",
    "/api/auth/refresh",
  ];

  if (skipPaths.some((p) => path.startsWith(p) || path.includes(p))) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const accessToken = cookies().get("accessToken")?.value;
  const refreshToken = cookies().get("refreshToken")?.value;

  if (!accessToken && refreshToken) {
    try {
      const refresh = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh`,
        {
          headers: {
            Authorization: refreshToken,
          },
        }
      );

      if (refresh.status === 200) {
        const info = await refresh.json();

        response.cookies.set({
          name: "accessToken",
          value: info.cookie,
          httpOnly: true,
          path: "/",
          maxAge: 15 * 60,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });

        return response;
      } else {
        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");
        return response;
      }
    } catch (error) {
      console.error("Refresh error:", error);
      return response;
    }
  }

  if (!accessToken) {
    return response;
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`, {
      headers: {
        Authorization: accessToken,
      },
    });

    if (res.status === 200) {
      return response;
    }

    if (res.status === 401 && refreshToken) {
      const refresh = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh`,
        {
          headers: {
            Authorization: refreshToken,
          },
        }
      );

      if (refresh.status === 200) {
        const info = await refresh.json();

        response.cookies.set({
          name: "accessToken",
          value: info.cookie,
          httpOnly: true,
          path: "/",
          maxAge: 15 * 60,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });

        return response;
      } else {
        response.cookies.delete("accessToken");
        response.cookies.delete("refreshToken");
        return response;
      }
    }

    return response;
  } catch (error) {
    console.error("Middleware error:", error);
    return response;
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|fonts|manifest.json|sw.js|workbox-|coffee-icon|api/auth/signin|api/auth/signup|api/auth/refresh).*)",
  ],
};

export default middleware;
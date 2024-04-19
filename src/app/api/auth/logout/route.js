import { cookies } from "next/headers";

export async function GET(req) {
  try {
    cookies().set("accessToken", "", {
      maxAge: 0,
      path: "/",
      httpOnly: true,
    });

    cookies().set("refreshToken", "", {
      maxAge: 0,
      path: "/",
      httpOnly: true,
    });

    return Response.json({ msg: "user logout successfully :)" });
  } catch (err) {
    return Response.json({ msg: err }, { status: 500 });
  }
}

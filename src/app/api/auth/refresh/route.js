import connectToDB from "@/configs/db";
import { generateAccessToken, verifyResfreshToken } from "@/utils/auth";
import usersModel from "@/models/User";
import { cookies, headers } from "next/headers";

export async function GET(req) {
  try {
    connectToDB();
    const refreshToken = headers().get("Authorization");
    if (!refreshToken) {
      return Response.json({ msg: "user is unauthorized" }, { status: 401 });
    }

    const refreshPayload = verifyResfreshToken(refreshToken);
    if (!refreshPayload) {
      return Response.json({ msg: "user is unauthorized" }, { status: 401 });
    }

    const user = await usersModel.findOne({ refreshToken: refreshToken });

    if (!user) {
      return Response.json({ msg: "user is unauthorized" }, { status: 401 });
    }

    const newAccessToken = generateAccessToken({ name: user.name });
    cookies().set("accessToken", newAccessToken, {
      httpOnly: true,
      path: "/",
    });
    return Response.json({
      msg: "new accessToken generated successfully :)",
      cookie: newAccessToken,
    });
  } catch (err) {
    return Response.json({ msg: err }, { status: 500 });
  }
}

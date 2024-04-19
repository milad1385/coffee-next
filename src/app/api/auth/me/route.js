import connectToDB from "@/configs/db";
import { cookies, headers } from "next/headers";
import usersModel from "@/models/User";
import { verifyAccessToken } from "@/utils/auth";

export async function GET(req) {
  try {
    connectToDB();
    const token =
      headers().get("Authorization") || cookies().get("accessToken")?.value;
    if (!token) {
      return Response.json({ msg: "user is unauthorized" }, { status: 401 });
    }
    const tokenPayload = verifyAccessToken(token);

    const userInfo = await usersModel.findOne(
      { name: tokenPayload.name },
      "-password -refreshToken -createdAt -updatedAt -__v"
    );

    if (!userInfo) {
      return Response.json({ msg: "user is unauthorized" }, { status: 401 });
    }

    return Response.json(userInfo);
  } catch (err) {
    return Response.json({ msg: err }, { status: 500 });
  }
}

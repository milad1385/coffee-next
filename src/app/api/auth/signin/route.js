import connectToDB from "@/configs/db";
import usersModel from "@/models/User";
import { cookies } from "next/headers";
import loginValidator from "@/validators/auth/login";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyPassword,
} from "@/utils/auth";
export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const isValid = await loginValidator(body);
    if (isValid !== true) {
      return Response.json({ msg: isValid }, { status: 422 });
    }
    const { identifire, password } = body;

    const user = await usersModel.findOne({
      $or: [{ email: identifire }, { phone: identifire }],
    });

    if (!user) {
      return Response.json(
        { msg: "email or phone is not founded :(" },
        { status: 404 }
      );
    }

    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return Response.json(
        { msg: "email or phone is not founded :(" },
        { status: 404 }
      );
    }

    const accessToken = generateAccessToken({ name: user.name });
    const refreshToken = generateRefreshToken({ name: user.name });

    await usersModel.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          refreshToken,
        },
      }
    );

    cookies().set({
      name: "accessToken",
      value: `${accessToken}`,
      httpOnly: true,
      path: "/",
      maxAge: 156000,
    });
    cookies().set({
      name: "refreshToken",
      value: `${refreshToken}`,
      httpOnly: true,
      path: "/",
      maxAge: 432000,
    });
    return Response.json(
      { msg: "User logged in successfully :)" },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return Response.json({ msg: "unknown err" }, { status: 500 });
  }
}

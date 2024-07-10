import connectToDB from "@/configs/db";
import usersModel from "@/models/User";
import { cookies } from "next/headers";
import {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
} from "@/utils/auth";
import validator from "@/validators/auth/register";
export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const isValid = await validator(body);
    if (isValid !== true) {
      return Response.json(isValid, { status: 422 });
    }

    const { name, phone, email, password } = body;

    const isUserExist = await usersModel.findOne({
      $or: [{ name }, { phone }, { email }],
    });

    if (isUserExist) {
      return Response.json(
        {
          msg: "name or email or phone is already exist :)",
        },
        { status: 419 }
      );
    }

    const usersCount = await usersModel.countDocuments();

    const hashedPassword = await hashPassword(password);
    const accessToken = generateAccessToken({ name });
    const refreshToken = generateRefreshToken({ name });

    await usersModel.create({
      name,
      phone,
      password: hashedPassword,
      email,
      role: usersCount > 0 ? "USER" : "ADMIN",
      refreshToken,
    });

    cookies().set({
      name: "accessToken",
      value: `${accessToken}`,
      httpOnly: true,
      path: "/",
      maxAge: 15,
    });
    cookies().set({
      name: "refreshToken",
      value: `${refreshToken}`,
      httpOnly: true,
      path: "/",
    });
    return Response.json(
      { msg: "User signed up successfully :)" },
      {
        status: 201,
      }
    );
  } catch (err) {
    console.log(err);
    return Response.json({ msg: "unknown err" }, { status: 500 });
  }
}

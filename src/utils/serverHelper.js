const { default: connectToDB } = require("@/configs/db");
const { cookies } = require("next/headers");
import { verifyAccessToken, verifyResfreshToken } from "@/utils/auth";
import usersModel from "@/models/User";
const authUser = async () => {
  connectToDB();
  const token = cookies().get("accessToken")?.value;

  if (!token) {
    return false;
  }

  const tokenPayload = verifyAccessToken(token);

  if (!tokenPayload) {
    return false;
  }

  const user = await usersModel.findOne(
    { name: tokenPayload?.name },
    "-refreshToken"
  );

  return user;
};



export { authUser  };

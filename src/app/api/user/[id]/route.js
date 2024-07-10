import connectToDB from "@/configs/db";
import { isValidObjectId } from "mongoose";
import usersModel from "@/models/User";
import { hashPassword, verifyPassword } from "@/utils/auth";
import { authUser } from "@/utils/serverHelper";
import path from "path";
import { writeFile } from "fs/promises";
export async function PUT(req, { params }) {
  try {
    connectToDB();
    const form = await req.formData();
    const name = form?.get("name");
    const phone = form?.get("phone");
    const email = form?.get("email");
    const image = form?.get("image");
    if (!name.length || !phone.length || !email.length) {
      return Response.json({ msg: "invalid fields" }, { status: 422 });
    }

    let filename = "user.png";

    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer());
      filename = Date.now() + image.name;
      const filePath = path.join(process.cwd(), "public/uploads/" + filename);
      const err = await writeFile(filePath, buffer);

      if (err) {
        return Response.json({ msg: "upload image faild !!!" });
      }
    }

    if (isValidObjectId(params.id)) {
      await usersModel.findOneAndUpdate(
        { _id: params.id },
        {
          name,
          phone,
          email,
          image: `http://localhost:3000/uploads/${filename}`,
        }
      );

      return Response.json(
        { msg: "user updated successFully:)" },
        { status: 200 }
      );
    } else {
      return Response.json({ msg: "invalid id value" }, { status: 422 });
    }
  } catch (err) {
    console.log(err);
    return Response.json({ msg: err }, { status: 500 });
  }
}

export async function POST(req, { params }) {
  try {
    connectToDB();
    const user = await authUser();

    const { oldPassword, newPassword } = await req.json();
    if (isValidObjectId(params.id)) {
      const isValidPass = await verifyPassword(oldPassword, user.password);
      if (isValidPass) {
        const hashedNewPassword = await hashPassword(newPassword, 10);
        await usersModel.findOneAndUpdate(
          { _id: user._id },
          {
            password: hashedNewPassword,
          }
        );

        return Response.json({ msg: "password change successfully:)" });
      } else {
        return Response.json(
          { msg: "password is incorrect !!!" },
          { status: 404 }
        );
      }
    } else {
      return Response.json({ msg: "id is invalid !!!" });
    }
  } catch (err) {
    return Response.json({ msg: err }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    connectToDB();
    if (isValidObjectId(params.id)) {
      const isUserExist = await usersModel.findOne({ _id: params.id });
      if (isUserExist) {
        await usersModel.findOneAndDelete({ _id: params.id });
        return Response.json({ msg: "user deleted successfully :)" });
      } else {
        return Response.json({ msg: "user in not founded" }, { status: 404 });
      }
    } else {
      return Response.json({ msg: "id is invalid" }, { status: 422 });
    }
  } catch (err) {
    return Response.json({ msg: err }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    connectToDB();
    if (isValidObjectId(params.id)) {
      const user = await usersModel.findOne({ _id: params.id });
      if (user) {
        await usersModel.findOneAndUpdate(
          { _id: params.id },
          {
            $set: {
              role: user.role === "ADMIN" ? "USER" : "ADMIN",
            },
          }
        );

        return Response.json({ msg: "role changed successfully :)" });
      } else {
        return Response.json({ msg: "user not founded" }, { status: 404 });
      }
    }
  } catch (err) {
    return Response.json({ msg: err }, { status: 500 });
  }
}

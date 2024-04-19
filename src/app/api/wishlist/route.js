import { isValidObjectId } from "mongoose";
import productsModel from "@/models/Product";
import usersModel from "@/models/User";
import wishsListModel from "@/models/Wishlist";
import connectToDB from "@/configs/db";
export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();

    const { user, product } = body;

    if (isValidObjectId(user) && isValidObjectId(product)) {
      const isProductExist = await productsModel.findOne({ _id: product });
      const isUserExist = await usersModel.findOne({ _id: user });
      if (isProductExist && isUserExist) {
        const isWishExist = await wishsListModel.findOne({ user, product });
        if (isWishExist) {
          return Response.json(
            { msg: "this wish list is already exist !!!" },
            { status: 419 }
          );
        } else {
          const wish = await wishsListModel.create({ user, product });
          return Response.json(
            { msg: "wish list created successfully:)", data: wish },
            { status: 201 }
          );
        }
      } else {
        return Response.json({ msg: "there isn't this product or user" });
      }
    } else {
      return Response.json({ msg: "id is invalid" }, { status: 422 });
    }
  } catch (err) {
    return Response.json({ msg: err }, { status: 500 });
  }
}

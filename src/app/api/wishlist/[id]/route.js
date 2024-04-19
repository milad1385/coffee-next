import connectToDB from "@/configs/db";
import wishsListModel from "@/models/Wishlist";
import { authUser } from "@/utils/serverHelper";
import { isValidObjectId } from "mongoose";
export async function GET(req, { params, searchParams }) {
  try {
    connectToDB();
    const isExisted = await wishsListModel.findOne({
      user: params.id,
      product: searchParams.product,
    });

    return Response.json(!!isExisted);
  } catch (err) {
    return Response.json({ msg: err }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const user = await authUser();
    if (isValidObjectId(params.id)) {
      await wishsListModel.findOneAndDelete({
        product: params.id,
        user: user._id,
      });
      return Response.json({ msg: "wish item deleted successfully :)" });
    } else {
      return Response.json({ msg: "id is invalid !!!!" }, { status: 422 });
    }
  } catch (err) {
    return Response.json({ msg: err }, { status: 500 });
  }
}

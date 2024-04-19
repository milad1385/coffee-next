import connectToDB from "@/configs/db";
import { isValidObjectId } from "mongoose";
import discountsModel from "@/models/Discount";
export async function DELETE(req, { params }) {
  try {
    connectToDB();
    if (isValidObjectId(params.id)) {
      await discountsModel.findOneAndDelete({ _id: params.id });
      return Response.json({ msg: "discount deleted successfully :)" });
    } else {
      return Response.json({ msg: "id is invalid" });
    }
  } catch (err) {
    return Response.json({ msg: err }, { status: 500 });
  }
}

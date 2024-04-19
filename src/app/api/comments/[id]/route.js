import connectToDB from "@/configs/db";
import commentsModel from "@/models/Comment";
import { isValidObjectId } from "mongoose";
export async function DELETE(req, { params }) {
  try {
    connectToDB();
    if (isValidObjectId(params.id)) {
      await commentsModel.findOneAndDelete({ _id: params.id });
      return Response.json(
        { msg: "comment deleted successfully:)" },
        { status: 200 }
      );
    } else {
      return Response.json({ msg: "id is invalid !!!!" }, { status: 422 });
    }
  } catch (err) {
    return Response.json({ msg: err.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    connectToDB();
    const { mode } = await req.json();
    console.log("status => " , mode);
    if (isValidObjectId(params.id)) {
      await commentsModel.findOneAndUpdate(
        { _id: params.id },
        {
          $set: {
            isAccept: mode ? true : false,
          },
        }
      );

      return Response.json({ msg: "status change successfully ::)" });
    } else {
      return Response.json({ msg: "id is invalid" }, { status: 422 });
    }
  } catch (err) {
    return Response.json({ msg: err.message }, { status: 500 });
  }
}

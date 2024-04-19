import commentValidator from "@/validators/comment/commentSchema";
import commentsModel from "@/models/Comment";
import connectToDB from "@/configs/db";
import productsModel from "@/models/Product";
export async function POST(req) {
  try {
    connectToDB();
    const reqBody = await req.json();
    const isValid = await commentValidator(reqBody);
    if (isValid !== true) {
      return Response.json({ msg: isValid }, { status: 422 });
    }

    const comment = await commentsModel.create(reqBody);
    const comments = await commentsModel.find({});
    let sumationOfScore = comments.reduce((prev, curr) => prev + curr.score, 0);

    let avgOfScores = Math.ceil(sumationOfScore / comments.length);

    await productsModel.findOneAndUpdate(
      { _id: reqBody.product },
      {
        $set: {
          score: avgOfScores,
        },
      }
    );
    return Response.json(
      { msg: "comment created successfully ;)", data: comment },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return Response.json({ msg: "unknown err" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const comments = await commentsModel
      .find({})
      .sort({ _id: -1 })
      .populate("product", "title")
      .populate("user", "phone");
    return Response.json(comments);
  } catch (err) {
    return Response.json({ msg: err }, { status: 500 });
  }
}

import connectToDB from "@/configs/db";
import BansModel from "@/models/Ban";
export async function POST(req) {
  try {
    connectToDB();
    const { email, phone } = await req.json();
    if (!email || email.length < 4) {
      return Response.json({ msg: "please send valid info" }, { status: 422 });
    }

    await BansModel.create({
      phone,
      email,
    });

    return Response.json(
      { msg: "user baned successfully :)" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return Response.json({ msg: err }, { status: 500 });
  }
}

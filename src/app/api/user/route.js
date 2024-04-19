import connectToDB from "@/configs/db";
import UsersModel from "@/models/User";
export async function PUT(req) {
  try {
    connectToDB();
    const { userId, email, phone, name } = await req.json();

    if (!userId || phone.length < 11 || !name) {
      return Response.json({ msg: "id is invalid" }, { status: 422 });
    }

    await UsersModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          email,
          phone,
          name,
        },
      }
    );

    return Response.json(
      { msg: "user updated successfully:)" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ msg: err }, { status: 500 });
  }
}

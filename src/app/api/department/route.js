import connectToDB from "@/configs/db";
import departmentsModel from "@/models/Department";
export async function POST(req) {
  try {
    connectToDB();
    const { title } = await req.json();
    if (!title || title.length < 4) {
      return Response.json(
        { msg: "please send valid value !!!" },
        { status: 422 }
      );
    }

    await departmentsModel.create({
      title,
    });

    return Response.json({ msg: "department created successfully :)" });
  } catch (err) {
    return Response.json({ msg: err }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    connectToDB();
    const departments = await departmentsModel.find({});
    return Response.json(departments);
  } catch (err) {
    return Response.json({ msg: err }, { status: 500 });
  }
}

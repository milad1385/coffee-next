import connectToDB from "@/configs/db";
import subDepartments from "@/models/SubDepartment";
export async function POST(req) {
  try {
    connectToDB();
    const { title, department } = await req.json();
    if (!title || title.length < 4 || !department) {
      return Response.json(
        { msg: "please send valid data to server" },
        {
          status: 422,
        }
      );
    }

    await subDepartments.create({
      title,
      department,
    });

    return Response.json({ msg: "subdepartment created successfully :)" });
  } catch (err) {
    return Response.json({ msg: err }, { status: 500 });
  }
}

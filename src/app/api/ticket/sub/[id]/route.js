import connectToDB from "@/configs/db";
import subDepartmentsModel from "@/models/SubDepartment";

export async function GET(req, { params }) {
  try {
    connectToDB();

    if (params.id) {
      const subDep = await subDepartmentsModel.find({
        department: params.id,
      });

      return Response.json(subDep);
    } else {
      return Response.json({ msg: "null" });
    }
  } catch (err) {
    return Response.json({ msg: err }, { status: 500 });
  }
}

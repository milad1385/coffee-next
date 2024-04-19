import connectToDB from "@/configs/db";
import { authUser } from "@/utils/serverHelper";
import TicketsModel from "@/models/Ticket";
export async function POST(req) {
  try {
    connectToDB();

    const user = await authUser();
    if (!user) return Response.json({ msg: "unathorized" }, { status: 401 });

    const {
      title,
      body,
      priority,
      department,
      subDepartment,
      replyTo,
      isFromUserPanel,
    } = await req.json();

    if (!title || !body || !priority || !department) {
      return Response.json({ msg: "data is invalid" }, { status: 422 });
    }

    await TicketsModel.create({
      title,
      body,
      priority,
      department,
      subDepartment,
      user: user._id,
      hasAnswer: false,
      isAnswer: true,
      replyTo,
      isFromUserPanel,
    });

    return Response.json(
      { msg: "ticket sended successfully:)" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ msg: err }, { status: 500 });
  }
}

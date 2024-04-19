import { authUser } from "@/utils/serverHelper";
import ticketsModel from "@/models/Ticket";
import { isValidObjectId } from "mongoose";
import connectToDB from "@/configs/db";
export async function POST(req) {
  try {
    connectToDB();
    const user = await authUser();
    if (!user) {
      return Response.json({ msg: "user is unauthorized" }, { status: 401 });
    }

    const { title, body, priority, department, subDepartment, isOpen } =
      await req.json();

    if (isValidObjectId(department)) {
      await ticketsModel.create({
        title,
        body,
        priority,
        department,
        subDepartment,
        user: user._id,
        isOpen,
      });

      return Response.json(
        { msg: "ticket saved successfully :)" },
        { status: 201 }
      );
    } else {
      return Response.json({ msg: "id is invalid" });
    }
  } catch (err) {
    console.log(err);
    return Response.json({ msg: err }, { status: 500 });
  }
}

export async function GET(req) {
  try {
  } catch (err) {
    return Response.json({ msg: err }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { ticketID } = await req.json();
    if (isValidObjectId(ticketID)) {
      const ticketInfo = await ticketsModel.findOne({ _id: ticketID });
      const ticket = await ticketsModel.findOneAndUpdate(
        { _id: ticketID },
        {
          $set: {
            isOpen: ticketInfo.isOpen ? false : true,
          },
        }
      );

      return Response.json({
        msg: `ticket ${ticket.isOpen ? "open" : "close"} successfully:)`,
      });
    }
  } catch (err) {
    return Response.json({ msg: err }, { status: 500 });
  }
}

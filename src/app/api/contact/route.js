import contactValidator from "@/validators/contact/create";
import contactsModel from "@/models/Contact";
import connectToDB from "@/configs/db";
export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const isValid = await contactValidator(body);

    if (isValid !== true) {
      return Response.json({ msg: isValid }, { status: 422 });
    }

    const message = await contactsModel.create(body);

    return Response.json(
      { msg: "msg sended successfully :)", message },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ msg: err }, { status: 500 });
  }
}

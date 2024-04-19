import connectToDB from "@/configs/db";
import { authUser } from "@/utils/serverHelper";
import discountsModel from "@/models/Discount";
export async function POST(req) {
  try {
    connectToDB();
    const user = await authUser();
    if (!user) {
      return Response.json(
        { msg: "unathorized please login !!!" },
        { status: 401 }
      );
    }
    const { code, percent, maxUsage } = await req.json();
    if (!code || code.length < 4 || !percent || !maxUsage) {
      return Response.json({ msg: "please send valid value" }, { status: 422 });
    }

    await discountsModel.create({
      code,
      percent,
      maxUsage,
      usage: 0,
      creator: user._id,
    });

    return Response.json(
      { msg: "discount code created successfully :)" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ msg: err.message });
  }
}

export async function GET(req) {
  try {
    connectToDB();
    const allDiscounts = await discountsModel
      .find({})
      .sort({ id: -1 })
      .populate("creator", "name");
    return Response.json(allDiscounts);
  } catch (err) {
    return Response.json({ msg: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    connectToDB();
    const { code } = await req.json();
    if (!code) {
      return Response.json(
        { msg: "please enter valid value" },
        { status: 422 }
      );
    }

    const discount = await discountsModel.findOne({ code });
    if (discount) {
      if (discount.maxUsage === discount.usage) {
        return Response.json({ msg: "code is expired !!!" }, { status: 410 });
      } else {
        await discountsModel.findOneAndUpdate(
          { code },
          {
            $inc: {
              usage: 1,
            },
          }
        );
        return Response.json({
          msg: "discount code use successfully:)",
          discount,
        });
      }
    } else {
      return Response.json({ msg: "code not founded !!!" }, { status: 404 });
    }
  } catch (err) {
    return Response.json({ msg: err }, { status: 500 });
  }
}

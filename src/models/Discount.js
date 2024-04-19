import mongoose from "mongoose";
import usersModel from "@/models/User";
const schema = mongoose.Schema(
  {
    code: {
      type: String,
      required: false,
    },
    percent: {
      type: Number,
      required: true,
    },
    maxUsage: {
      type: Number,
      required: true,
    },
    usage: {
      type: Number,
      required: true,
    },
    creator: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.models.Discount || mongoose.model("Discount", schema);

export default model;

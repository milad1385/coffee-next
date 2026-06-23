import mongoose from "mongoose";

const schema =new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      default: "USER",
    },
    refreshToken: String,
    image: {
      type: String,
      default: "https://coffeeset.vercel.app/uploads/user.png",
      required: false,
    },
  },
  { timestamps: true }
);

const model = mongoose.models?.User || mongoose.model("User", schema);

export default model;

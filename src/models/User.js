import mongoose from "mongoose";

const schema = mongoose.Schema(
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
      default: "http://localhost:3000/uploads/user.png",
      required: false,
    },
  },
  { timestamps: true }
);

const model = mongoose.models?.User || mongoose.model("User", schema);

export default model;

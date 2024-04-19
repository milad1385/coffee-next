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
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    refreshToken: String,
  },
  { timestamps: true }
);

const model = mongoose.models.Contact || mongoose.model("Contact", schema);

export default model;

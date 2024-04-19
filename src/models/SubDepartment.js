import mongoose from "mongoose";
import Department from "@/models/Department";
const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    department: {
      type: mongoose.Types.ObjectId,
      ref: "Department",
    },
  },
  { timestamps: true }
);

const model =
  mongoose.models.SubDepartment || mongoose.model("SubDepartment", schema);

export default model;

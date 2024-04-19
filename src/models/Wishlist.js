import mongoose from "mongoose";
import usersModel from "@/models/User";
import productsModel from "@/models/Product";
const schema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.models.Wishlist || mongoose.model("Wishlist", schema);

export default model;

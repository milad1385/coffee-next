import mongoose from "mongoose";
import commentsModel from "@/models/Comment";
const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      default: 5,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    longDesc: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    count: {
      type: Number,
      default: 10,
    },
    weight: {
      type: Number,
      required: true,
    },
    sutaibleFor: {
      type: String,
      required: true,
    },
    smell: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);


schema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "product",
});


const model = mongoose.models.Product || mongoose.model("Product", schema);

export default model;

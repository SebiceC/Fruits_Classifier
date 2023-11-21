import mongoose from "mongoose";

const prediction = new mongoose.Schema(
  {
    prediction: {
      type: String,
      required: true,
      trim: true,
    },
  },
);

export default mongoose.model("prediccione", prediction);

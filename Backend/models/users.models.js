import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: false
  },
  orders: [{
    item: { type: mongoose.Schema.Types.ObjectId, ref: "items" },
    quantity: { type: Number, default: 1, min: 1 }
  }],

  contactno: {
    type: Number
  },
  picture: {
    type: String,
    default: "../public/b2eaa0d4918d54021f9c7aa3fc3d3cf3.jpg"
  }
}, { timestamps: true });

export const users = mongoose.model("users", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [50, "Name cannot exceed 50 characters"],
    validate: {
      validator: function (v) {
        return /^[a-zA-Z\s'-]+$/.test(v);
      },
      message: "Name can only contain alphabetic letters, spaces, hyphens, and apostrophes",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
    password: {
    type: String,
    required: true
    },
    cartData: {
        type: Object,
        default:{}
    }
} , {
  timestamps: true
  , minimize: false
});

const User = mongoose.model("User", userSchema);

export default User;
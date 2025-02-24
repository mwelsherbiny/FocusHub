import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password_hash: {
    type: String,
    required: true,
  },
  pomodoros: {
    type: Number,
    default: 0,
  },
  settings: {
    type: Object,
    default: {
      lightMode: false,
      sessionTime: 25,
      breakTime: 5,
    },
  },
});

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password_hash;
    delete ret.__v;
  },
});

const User = mongoose.model("User", userSchema);

export default User;

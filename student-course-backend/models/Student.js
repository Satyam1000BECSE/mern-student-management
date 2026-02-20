import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  city: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    // unique: true
  },
  studentUser: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
},
  courses: [
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    customDuration: {
      type: Number,
      default: null
    },
    customFees: {
      type: Number,
      default: null
    }
  }
]


});

export default mongoose.model("Student", studentSchema);

// import mongoose from "mongoose";

// const courseSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   duration: { type: Number, required: true },
//   fees: { type: Number, required: true }
// });

// export default mongoose.model("Course", courseSchema);

import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  fees: { type: Number, required: true },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

export default mongoose.model("Course", courseSchema);

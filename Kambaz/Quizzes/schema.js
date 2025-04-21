import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  _id: String,
  title: { type: String, required: true },
  description: String,
  course: { type: String, ref: "CourseModel", required: true },
  questions: [{ type: mongoose.Schema.Types.Mixed }], 
  published: { type: Boolean, default: false },
  available: String, 
  due: String,
  points: Number,
  maxAttempts: { type: Number, default: 1 }
}, { collection: "quizzes" });

export default quizSchema;

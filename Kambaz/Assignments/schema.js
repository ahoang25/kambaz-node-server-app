import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  _id: String,  
  title: { type: String, required: true },
  course: { type: String, ref: "CourseModel", required: true },
  due: { type: String, required: true },
  available: { type: String, required: true },
  points: { type: String, required: true }
}, { collection: "assignments" });

export default assignmentSchema;

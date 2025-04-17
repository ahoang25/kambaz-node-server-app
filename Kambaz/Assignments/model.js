import mongoose from "mongoose";
import assignmentSchema from "./assignmentsSchema.js";

const model = mongoose.model("AssignmentModel", assignmentSchema);
export default model;

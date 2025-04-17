import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export async function createAssignment(courseId, assignment) {
  const newAssignment = {
    _id: uuidv4(),
    ...assignment,
    course: courseId
  };
  return await model.create(newAssignment);
}

export async function findAssignmentsForCourse(courseId) {
  const assignments = await model.find({ course: courseId });
  return assignments;
}

export async function updateAssignment(assignmentId, updatedAssignment) {
  const status = await model.updateOne(
    { _id: assignmentId },
    { $set: updatedAssignment }
  );
  return status;
}

export async function deleteAssignment(assignmentId) {
  return await model.deleteOne({ _id: assignmentId });
}

export async function findAssignmentById(assignmentId) {
  return await model.findById(assignmentId);
}

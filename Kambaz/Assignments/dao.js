import model from "./model.js";

export async function createAssignment(courseId, assignment) {
  const newAssignment = { ...assignment, course: courseId };
  return await model.create(newAssignment);
}

export async function findAssignmentsForCourse(courseId) {
  return await model.find({ course: courseId });
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

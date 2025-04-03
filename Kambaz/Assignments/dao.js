import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function createAssignment(courseId, assignment) {
  const newAssignment = { ...assignment, _id: uuidv4(), course: courseId };
  Database.assignments.push(newAssignment);
  return newAssignment;
}

export function findAssignmentsForCourse(courseId) {
  return Database.assignments.filter(a => a.course === courseId);
}

export function updateAssignment(assignmentId, updatedAssignment) {
  const index = Database.assignments.findIndex(a => a._id === assignmentId);
  if (index !== -1) {
    Database.assignments[index] = { ...Database.assignments[index], ...updatedAssignment };
    return Database.assignments[index];
  }
  return null;
}

export function deleteAssignment(assignmentId) {
  const index = Database.assignments.findIndex(a => a._id === assignmentId);
  if (index !== -1) {
    return Database.assignments.splice(index, 1)[0];
  }
  return null;
}

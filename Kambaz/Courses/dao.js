import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export async function findAllCourses() {
  return await model.find();
}

  export function enrollUserInCourse(userId, courseId) {
    const { enrollments } = Database;
    enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
  }
  
  export async function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    return await model.create(newCourse);

  }
  
  export async function updateCourse(courseId, courseUpdates) {
    return await model.updateOne({ _id: courseId }, { $set: courseUpdates });
  }
  
  export async function deleteCourse(courseId) {
    return await model.deleteOne({ _id: courseId });
   }
   
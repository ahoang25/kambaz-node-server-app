import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";


export function enrollUserInCourse(userId, courseId) {
    const { enrollments } = Database;
    const existing = enrollments.find(
      (e) => e.user === userId && e.course === courseId
    );
    if (existing) return null;
  
    const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
    enrollments.push(newEnrollment);
    return newEnrollment;
  }

export function unenrollUserFromCourse(userId, courseId) {
    const index = Database.enrollments.findIndex(
      (e) => e.user === userId && e.course === courseId
    );
    if (index !== -1) {
      Database.enrollments.splice(index, 1);
    }
  }
  
  export function findEnrollmentsForUser(userId) {
    return Database.enrollments.filter((e) => e.user === userId);
  }
  
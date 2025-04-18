import model from "./model.js";

export async function findAllEnrollments() {
  const enrollments = await model.find();
  return enrollments;
}

export async function findEnrollmentsForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments;
}

export async function findEnrollmentsForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments;
}

export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
 }

 
export const findUsersForCourse = async (courseId) => {
  const enrollments = await model
    .find({ course: courseId })
    .populate("user");

  return enrollments;
}


export function enrollUserInCourse(user, course) {
  const newEnrollment = { user, course, _id: `${user}-${course}` };
  return model.create(newEnrollment);
 }
 export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
 }
 


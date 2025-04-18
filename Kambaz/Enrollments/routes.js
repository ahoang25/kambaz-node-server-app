import express from "express";
import * as dao from "./dao.js";


export default function EnrollmentsRoutes(app) {

  const findAllEnrollments = async (req, res) => {
    const enrollments = await dao.findAllEnrollments();
    res.json(enrollments);
  };

  const findEnrollmentsForUser = async (req, res) => {
    const { userId } = req.params;
    const enrollments = await dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  const findEnrollmentsForCourse = async (req, res) => {
    const { courseId } = req.params;
    const enrollments = await dao.findEnrollmentsForCourse(courseId);
    res.json(enrollments);
  };

  const findCoursesForUser = async (req, res) => {
     const { userId } = req.params;
     const enrollments = await dao.findEnrollmentsForUser(userId);
     const courses = enrollments.map((enrollment) => enrollment.course);
    res.json(courses);
   };

  // const findUsersForCourse = async (req, res) => {
  //   const { courseId } = req.params;
  //   const enrollments = await dao.findUsersForCourse(courseId);
  //   const users = enrollments.filter((e) => e.user !== null).map((enrollment) => enrollment.user);
  //   res.json(users);
  // };

  const enrollUserInCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
    res.send(status);
  };
  const unenrollUserFromCourse = async (req, res) => {
    let { uid, cid } = req.params;
    if (uid === "current") {
      const currentUser = req.session["currentUser"];
      uid = currentUser._id;
    }
    const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
    res.send(status);
  };

  const findCoursesForCurrentUser = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.status(401).send("Unauthorized");
    }
    const courses = await dao.findCoursesForUser(currentUser._id);
    res.json(courses);
  };
 
  app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
  app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);
  app.get("/api/enrollments", findAllEnrollments);
  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
  app.get("/api/courses/:courseId/enrollments", findEnrollmentsForCourse);
  //app.get("/api/courses/:courseId/users", findUsersForCourse);
  app.get("/api/users/:userId/courses", findCoursesForUser);
  app.get("/api/users/current/courses", findCoursesForCurrentUser);


}

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

  const findUsersForCourse = async (req, res) => {
    const { courseId } = req.params;
    const enrollments = await dao.findUsersForCourse(courseId);
    const users = enrollments.filter((e) => e.user !== null).map((enrollment) => enrollment.user);
    res.json(users);
  };


app.get("/api/enrollments", findAllEnrollments);
  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);
  app.get("/api/courses/:courseId/enrollments", findEnrollmentsForCourse);
  app.get("/api/courses/:courseId/users", findUsersForCourse);
  app.get("/api/users/:userId/courses", findCoursesForUser);

}

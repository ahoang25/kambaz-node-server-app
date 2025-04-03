import express from "express";
import * as dao from "./dao.js";

const router = express.Router();

export default function EnrollmentsRoutes(app) {
  app.use("/api/enrollments", router);

  router.post("/", (req, res) => {
    const { userId, courseId } = req.body;
    const enrollment = dao.enrollUserInCourse(userId, courseId);
    if (enrollment) {
      res.json(enrollment);
    } else {
      res.status(400).json({ error: "Already enrolled" });
    }
  });
  
  router.delete("/:userId/:courseId", (req, res) => {
    const { userId, courseId } = req.params;
    const result = dao.unenrollUserFromCourse(userId, courseId);
    if (result) {
      res.sendStatus(200);
    } else {
      res.status(404).json({ error: "Enrollment not found" });
    }
  });

  router.get("/user/:userId", (req, res) => {
    const { userId } = req.params;
    const userEnrollments = dao.findEnrollmentsForUser(userId);
    res.json(userEnrollments);
  });
}

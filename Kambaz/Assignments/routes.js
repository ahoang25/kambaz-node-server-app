import * as dao from "./dao.js";
import express from "express";

export default function AssignmentRoutes(app) {
  const createAssignment = async (req, res) => {
    const { courseId } = req.params;
    const newAssignment = await dao.createAssignment(courseId, req.body);
    res.json(newAssignment);
  };

  const findAssignmentsForCourse = async (req, res) => {
    const { courseId } = req.params;
    const assignments = await dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  };

  const updateAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const status = await dao.updateAssignment(assignmentId, req.body);
    res.json(status);
  };

  const deleteAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const status = await dao.deleteAssignment(assignmentId);
    res.json(status);
  };

  // Route bindings
  app.post("/api/courses/:courseId/assignments", createAssignment);
  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}

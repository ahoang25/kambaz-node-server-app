import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";


export default function CourseRoutes(app) {
  const findUsersForCourse = async (req, res) => {
    const { cid } = req.params;
    const users = await enrollmentsDao.findUsersForCourse(cid);
    res.json(users);
  };
 


  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  });
 

  app.delete("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.deleteCourse(courseId);
    res.send(status);
  });
 


  app.put("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = await dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  });
 

  // app.post("/api/courses/:courseId/modules", async (req, res) => {
  //   const { courseId } = req.params;
  //   const module = {
  //     ...req.body,
  //     course: courseId,
  //   };
  //   const newModule = await modulesDao.createModule(module);
  //   res.send(newModule);
  // });
 

  app.post("/api/courses", async (req, res) => {
    const course = await dao.createCourse(req.body);
    res.json(course);
  });
 

  // app.get("/api/courses/:courseId/modules", async (req, res) => {
  //   const { courseId } = req.params;
  //   const modules = await modulesDao.findModulesForCourse(courseId);
  //   res.json(modules);
  // });
 

  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignments = assignmentsDao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });
  
  app.post("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignment = assignmentsDao.createAssignment(courseId, req.body);
    res.json(assignment);
  });

  app.put("/api/courses/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const updated = assignmentsDao.updateAssignment(assignmentId, req.body);
    res.json(updated);
  });

  app.delete("/api/courses/assignments/:assignmentId", (req, res) => {
    const { assignmentId } = req.params;
    const deleted = assignmentsDao.deleteAssignment(assignmentId);
    res.json(deleted);
  });

  app.get("/api/courses/:cid/users", findUsersForCourse);

}



const express = require("express");
const router = express.Router();
const students = require("../data/students");

// Helper: next available id
const getNextId = () =>
  students.length ? Math.max(...students.map((s) => s.id)) + 1 : 1;

// Helper: validate student body
const isValid = (body) =>
  body &&
  typeof body.name === "string" && body.name.trim() !== "" &&
  typeof body.course === "string" && body.course.trim() !== "";

// GET /students - get all students
router.get("/", (req, res) => {
  res.status(200).json(students);
});

// GET /students/:id - get a student by id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid student ID" });
  }
  const student = students.find((s) => s.id === id);
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  res.status(200).json(student);
});

// POST /students - create a new student
router.post("/", (req, res) => {
  if (!isValid(req.body)) {
    return res
      .status(400)
      .json({ error: "Invalid input: 'name' and 'course' are required" });
  }
  const newStudent = {
    id: getNextId(),
    name: req.body.name.trim(),
    course: req.body.course.trim()
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT /students/:id - update a student
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid student ID" });
  }
  if (!isValid(req.body)) {
    return res
      .status(400)
      .json({ error: "Invalid input: 'name' and 'course' are required" });
  }
  const student = students.find((s) => s.id === id);
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  student.name = req.body.name.trim();
  student.course = req.body.course.trim();
  res.status(200).json(student);
});

// DELETE /students/:id - delete a student
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid student ID" });
  }
  const index = students.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }
  const [deleted] = students.splice(index, 1);
  res.status(200).json({ message: "Student deleted successfully", student: deleted });
});

module.exports = router;

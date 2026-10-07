const express = require("express");
const logger = require("./middleware/logger");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in middleware to parse JSON bodies
app.use(express.json());

// Custom logger middleware
app.use(logger);

// Home route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Student Management REST API is running" });
});

// Modular routing
app.use("/students", studentRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler (invalid JSON, unexpected errors)
app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON in request body" });
  }
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

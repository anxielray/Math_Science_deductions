const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "../db/posts.db");
const db = new sqlite3.Database(dbPath);

// Create table for questions (with description)
const createQuestionsTable = `
  CREATE TABLE IF NOT EXISTS questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subject TEXT NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`;
db.run(createQuestionsTable);

// Get all questions
router.get("/", (req, res) => {
  db.all(
    "SELECT id, subject, description, created_at FROM questions ORDER BY created_at DESC",
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: "Failed to fetch questions." });
      res.status(200).json(rows);
    }
  );
});

// Create a new question
router.post("/", (req, res) => {
  const { subject, description = "" } = req.body;

  if (!subject || subject.trim() === "")
    return res.status(400).json({ error: "Subject is required." });

  const stmt = db.prepare("INSERT INTO questions (subject, description) VALUES (?, ?)");
  stmt.run(subject.trim(), description.trim(), function (err) {
    if (err) return res.status(500).json({ error: "Failed to create question." });

    res.status(201).json({
      message: "Question created.",
      id: this.lastID,
      subject: subject.trim(),
      description: description.trim(),
    });
  });
  stmt.finalize();
});

module.exports = router;

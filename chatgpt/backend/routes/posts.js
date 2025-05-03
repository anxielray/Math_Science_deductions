const express = require("express");
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "../db/posts.db");
const db = new sqlite3.Database(dbPath);

// Ensure table exists
db.run(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    question_id INTEGER,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id)
  )
`);


// GET /api/posts
router.get("/", (req, res) => {
  db.all("SELECT * FROM posts ORDER BY timestamp DESC", [], (err, rows) => {
    if (err) {
      console.error("Error fetching posts:", err);
      return res.status(500).json({ error: "Failed to fetch posts." });
    }
    res.status(200).json(rows);
  });
});

// POST /api/posts
router.post("/", (req, res) => {
  const { content, question_id } = req.body;

  if (!content || content.trim() === "") {
    return res.status(400).json({ error: "Content is required." });
  }

  const stmt = db.prepare(
    "INSERT INTO posts (content, question_id) VALUES (?,?)"
  );
  stmt.run([content, question_id], function (err) {
    if (err) {
      console.error("Error inserting post:", err);
      return res.status(500).json({ error: "Failed to create post." });
    }
    // res.status(201).json({ message: "Post created successfully.", id: this.lastID });
    res.status(201).json({
      id: this.lastID,
      content,
      timestamp: new Date().toISOString()
    });
  });
  stmt.finalize();

});

module.exports = router;

const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../db/posts.json");

// Ensure the posts file exists
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, "[]", "utf-8");
}

// GET /api/posts
exports.getPosts = (req, res) => {
  try {
    const data = fs.readFileSync(dbPath, "utf-8");
    const posts = JSON.parse(data);
    res.status(200).json(posts.reverse()); // Newest posts first
  } catch (err) {
    console.error("Failed to read posts:", err);
    res.status(500).json({ error: "Failed to load posts." });
  }
};

// POST /api/posts
exports.createPost = (req, res) => {
  const { content } = req.body;

  if (!content || content.trim() === "") {
    return res.status(400).json({ error: "Content is required." });
  }

  try {
    const data = fs.readFileSync(dbPath, "utf-8");
    const posts = JSON.parse(data);

    const newPost = {
      content,
      timestamp: new Date().toISOString()
    };

    posts.push(newPost);
    fs.writeFileSync(dbPath, JSON.stringify(posts, null, 2), "utf-8");

    res.status(201).json({ message: "Post created successfully." });
  } catch (err) {
    console.error("Failed to save post:", err);
    res.status(500).json({ error: "Failed to save post." });
  }
};

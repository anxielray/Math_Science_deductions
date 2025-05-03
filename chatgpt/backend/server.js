const express = require("express");
const cors = require("cors");
const path = require("path");
const postRoutes = require("./routes/posts");
const questionRoutes = require("./routes/questions");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/posts", postRoutes);
app.use("/api/questions", questionRoutes);

// Health check
app.get("/", (req, res) => {
    res.send("Welcome to Raymond's Mathematical and Scientific Deductions API");
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

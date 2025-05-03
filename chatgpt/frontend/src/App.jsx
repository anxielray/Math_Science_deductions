// File: app.jsx
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import "./index.css";
import "./App.css";
import QuestionSelector from "./components/ui/QuestionSelector";
import Aside from "./components/ui/Aside";
import NewDiscussionForm from "@/components/ui/NewDiscussionForm";
import SidebarTopics from "@/components/ui/SidebarTopics";
import QuestionDropdown from "@/components/ui/QuestionDropdown";

export default function App() {
  
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    const res = await fetch("/api/questions");
    const data = await res.json();
    setQuestions(data);
  };

  const fetchPosts = async () => {
    const url = selectedQuestionId
      ? `/api/posts/by-question/${selectedQuestionId}`
      : "/api/posts";
    const res = await fetch(url);
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchQuestions(); // Only once on mount
  }, []);

  useEffect(() => {
    fetchPosts(); // When selectedQuestionId changes
  }, [selectedQuestionId]);

  const submitPost = async () => {
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, question_id: selectedQuestionId })
    });
    setContent("");
    fetchPosts();
  };

  const handleNewQuestion = async (subject) => {
    const res = await fetch("/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject })
    });

    const data = await res.json();
    setSelectedQuestionId(data.id);
    fetchQuestions(); // Refresh questions to update UI
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar (Aside) */}
      <Aside onSelect={setSelectedQuestionId} />
  
      {/* Main Content */}
      <main className="scientific-container" style={{ marginLeft: "260px", padding: "2rem" }}>
        
        {/* Floating Icons */}
        <div className="floating-icons">
          <img src="/assets/atom.png" alt="Atom" className="floating-icon icon1" />
          <img src="/assets/pi.png" alt="Pi" className="floating-icon icon2" />
          <img src="/atom3.png" alt="Atom" className="floating-icon icon3" />
        </div>
  
        {/* Title */}
        <h1 className="title">
          Math and Science Deductions Beyond 3D
        </h1>
  
        {/* QuestionSelector (Create new question or select an existing one) */}
        <QuestionSelector
          onQuestionSelect={(id) => setSelectedQuestionId(id)}
          onNewQuestion={(subject) => handleNewQuestion(subject)}
          className="question-selector"
        />
  
        {/* New Discussion Form and Reply Options */}
        {/* <div style={{ marginTop: "2rem" }}>
          <h4>Or reply to an existing question:</h4>
          <QuestionDropdown 
            questions={questions} 
            onSelect={(id) => console.log("Selected:", id)} 
          />
        </div> */}
  
        {/* Input Section (Write Deduction) */}
        <motion.section className="input-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your deduction here..."
          />
          <button onClick={submitPost} className="submit-button">
            Submit
          </button>
        </motion.section>
  
        {/* Posts Section (Displaying Submitted Posts) */}
        <section className="posts-section">
          {posts.map((post, index) => (
            <div key={index} className="post-card">
              <div className="post-content">
                <ReactMarkdown rehypePlugins={[rehypeKatex]} remarkPlugins={[remarkMath]}>
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
  
}

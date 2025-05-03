import React, { useEffect, useState } from "react";

export default function Aside({ onSelect }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("/api/questions")
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  return (
    <aside style={{ width: "250px", background: "#111", padding: "1rem", color: "white", position: "fixed", height: "100vh" }}>
      <h2>Topics</h2>
      <ul>
        {questions.map((q) => (
          <li key={q.id} onClick={() => onSelect(q.id)} style={{ cursor: "pointer", padding: "4px 0" }}>{q.subject}</li>
        ))}
      </ul>
    </aside>
  );
}


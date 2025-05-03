import React, { useEffect, useState } from "react";

export default function QuestionSelector({ onQuestionSelect, onNewQuestion }) {
  const [questions, setQuestions] = useState([]);
  const [mode, setMode] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/questions")
      .then(res => res.json())
      .then(data => setQuestions(data));
  }, []);

  const filtered = questions.filter(q =>
    q.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="question-selector">
      <h2>What are you doing?</h2>
      <button onClick={() => setMode("reply")}>Reply to a Question</button>
      <button onClick={() => setMode("new")}>Start a New Discussion</button>

      {mode === "reply" && (
        <div className="question-search-container">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select onChange={(e) => onQuestionSelect(e.target.value)}>
            <option value="">Select a question</option>
            {filtered.map(q => (
              <option key={q.id} value={q.id}>{q.subject}</option>
            ))}
          </select>
        </div>
      )}


      {mode === "new" && (
        <div className="new-question-container">
          <input type="text" className="new-question-input" placeholder="New question subject..." onBlur={(e) => onNewQuestion(e.target.value)} />
        </div>
      )}

    </div>
  );
}

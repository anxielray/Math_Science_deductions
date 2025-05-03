import React from "react";

export default function QuestionDropdown({ questions, onSelect }) {
  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select a question</option>
      {questions.map((q) => (
        <option key={q.id} value={q.id}>{q.subject}</option>
      ))}
    </select>
  );
}

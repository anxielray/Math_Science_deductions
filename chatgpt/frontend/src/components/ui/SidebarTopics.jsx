import React from "react";

export default function SidebarTopics({ questions }) {
  return (
    <aside className="sidebar">
      <h3>Discussion Topics</h3>
      <ul>
        {questions.map(q => (
          <li key={q.id}>{q.subject}</li>
        ))}
      </ul>
    </aside>
  );
}

import React, { useState } from "react";
import "./../../App.css";

export default function NewDiscussionForm({ onQuestionAdded }) {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, description }),
    });

    const data = await res.json();
    if (res.ok) {
      onQuestionAdded(data); // Update sidebar and dropdown
      setSubject("");
      setDescription("");
    } else {
      alert(data.error);
    }
  };

  return (
    <form className="new-discussion-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter question subject..."
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      />
      <textarea
        placeholder="Write a brief description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Start Discussion</button>
    </form>
  );
}

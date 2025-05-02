// sends the user’s answer to the /check_answer endpoint and displays whether the answer is correct

// sends the user’s answer to the /check_answer endpoint and displays whether the answer is correct

import React, { useState } from "react";

interface AnswerFormProps {
  task: {
    description: string;
    quiz: {
      type: string;
      solutions?: string[];
      solution?: string;
    };
  };
}

const QuizAnswerForm: React.FC<AnswerFormProps> = ({ task }) => {
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("http://127.0.0.1:5050/check_answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task_description: task.description,
        user_input: input,
      }),
    })
      .then((response) => response.json())
      .then((data) => setFeedback(data.message))
      .catch((error) => {
        console.error("Error checking answer:", error);
        setFeedback("Error checking answer.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your solution"
          style={{ width: "100%", marginBottom: "10px" }}
        />
      </div>
      <button type="submit">Submit Answer</button>
      {feedback && (
        <div style={{ marginTop: "10px", color: feedback.includes("Incorrect") ? "red" : "green" }}>
          {feedback}
        </div>
      )}
    </form>
  );
};

export default QuizAnswerForm;
// sends the user’s answer to the /check_answer endpoint and displays whether the answer is correct

import React, { useState } from "react";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface AnswerFormProps {
  task: {
    id: string;
    description: string;
    quiz: {
      type: string;
    };
  };
  filename: string;
  onCorrectAnswer?: () => void;
}

const QuizAnswerForm: React.FC<AnswerFormProps> = ({ task, filename, onCorrectAnswer }) => {
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`${backendUrl}/check_answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task_id: task.id,
        user_input: input,
        quiz_type: task.quiz.type,
        firebase_uid: localStorage.getItem("firebase_uid"),
        filename: filename
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setFeedback(data.message);
        if (data.correct && onCorrectAnswer) {
          onCorrectAnswer();
        }
      })
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
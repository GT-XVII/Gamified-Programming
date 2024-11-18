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
  userInputs?: string[]; // Optional prop for fillout-quiz
}

const QuizAnswerForm: React.FC<AnswerFormProps> = ({ task, userInputs }) => {
  const [input, setInput] = useState(""); // Used for coding-quiz
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const inputToSend = userInputs && userInputs.length > 0
      ? userInputs.join(" ")
      : input;

    fetch("http://127.0.0.1:5050/check_answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task_description: task.description,
        user_input: inputToSend,
      }),
    })
      .then((response) => response.json())
      .then((data) => setFeedback(data.message))
      .catch((error) => {
        console.error("Error checking answer:", error);
        setFeedback("Error checking answer.");
      });
  };

  const handleReset = () => {
    setInput("");
    setFeedback("");
  };

  return (
    <form onSubmit={handleSubmit}>
      {task.quiz.type === "coding-quiz" && (
        <div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your solution"
            style={{ width: "100%", marginBottom: "10px" }}
          />
        </div>
      )}
      <button type="submit">Submit Answer</button>
      <button type="button" onClick={handleReset} style={{ marginLeft: "10px" }}>
        Reset
      </button>
      <div
        style={{
          border: "1px solid black",
          padding: "5px",
          color: feedback.includes("Incorrect") ? "red" : "green",
        }}
      >
        {feedback}
      </div>
    </form>
  );
};

export default QuizAnswerForm;

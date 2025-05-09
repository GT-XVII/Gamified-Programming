// displays individual quiz tasks and accepts user inputs
// Depending on the task type (e.g., "fillout-quiz" or "coding-quiz"), it displays different input forms.


import React, { useState } from "react";
import QuizAnswerForm from "./QuizAnswerForm";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface TaskProps {
  task: {
    description: string;
    quiz: {
      type: string;
      template?: string;
      solutions?: string[];
      solution?: string;
    };
  };
}

const QuizTask: React.FC<TaskProps> = ({ task }) => {
  const [feedback, setFeedback] = useState(""); // Always declared unconditionally

  // Always initialize variables/hooks, even if not used for certain types
  const templateParts = task.quiz.template ? task.quiz.template.split(/§{2,3}/) : [];
  const [inputs, setInputs] = useState<string[]>(
    task.quiz.template ? new Array(templateParts.length - 1).fill("") : []
  );

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userInput = inputs.join(" ");
    fetch(`${backendUrl}/check_answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task_description: task.description,
        user_input: userInput,
      }),
    })
      .then((response) => response.json())
      .then((data) => setFeedback(data.message))
      .catch((error) => {
        console.error("Error checking answer:", error);
        setFeedback("Error checking answer.");
      });
  };

  const renderQuizContent = () => {
    if (task.quiz.type === "fillout-quiz" && task.quiz.template) {
      // Render fillout-quiz
      return (
        <form onSubmit={handleSubmit}>
          <p>
            {templateParts.map((part, index) => (
              <span key={index}>
                {part}
                {index < templateParts.length - 1 && (
                  <input
                    type="text"
                    value={inputs[index] || ""}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    placeholder="___"
                    style={{ width: "50px", margin: "0 5px" }}
                  />
                )}
              </span>
            ))}
          </p>
          <button type="submit">Submit Answer</button>
        </form>
      );
    } else if (task.quiz.type === "coding-quiz") {
      // Render coding-quiz
      return <QuizAnswerForm task={task} />;
    } else {
      // Render fallback for unknown types
      return <p>Unknown quiz type</p>;
    }
  };

  return (
    <div className="quiz-task">
      <h3>{task.description}</h3>
      {renderQuizContent()}
      {feedback && <p className="feedback">{feedback}</p>}
    </div>
  );
};

export default QuizTask;
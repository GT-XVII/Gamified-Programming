// displays individual quiz tasks and accepts user inputs
// Depending on the task type (e.g., "fillout-quiz" or "coding-quiz"), it displays different input forms.


import React, { useState, useEffect } from "react";
import QuizAnswerForm from "./QuizAnswerForm";
import { getAuth } from "firebase/auth";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

interface TaskProps {
  task: {
    id: string;
    description: string;
    quiz: {
      type: string;
      template?: string;
      solutions?: string[];
      solution?: string;
    };
  };
  filename: string;
  setTask: (task: any) => void;
}

const QuizTask: React.FC<TaskProps> = ({ task, filename, setTask }) => {
  const currentUser = getAuth().currentUser;
  const firebase_uid = currentUser?.uid || "";

  const [feedback, setFeedback] = useState(""); // Always declared unconditionally
  const [correctAnswered, setCorrectAnswered] = useState(false);

  // Always initialize variables/hooks, even if not used for certain types
  const templateParts = task.quiz.template ? task.quiz.template.split(/§{2,3}/) : [];
  const [inputs, setInputs] = useState<string[]>(
    task.quiz.template ? new Array(templateParts.length - 1).fill("") : []
  );

  useEffect(() => {
    console.log("Rendering task ID:", task.id);
  }, [task]);

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userInput = inputs.join(" ");
    
    console.log("Sending payload:", {
      task_id: task.id,
      user_input: userInput,
      quiz_type: task.quiz.type,
      firebase_uid: firebase_uid,
      filename: filename
    });

    fetch(`${backendUrl}/check_answer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quiz_task_id: task.id,
        user_input: userInput,
        quiz_type: task.quiz.type,
        firebase_uid: firebase_uid,
        filename: filename
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          console.error("Backend error:", data);
          setFeedback(data.message || "Something went wrong.");
        } else {
          setFeedback(data.message);
          if (data.correct) {
            setCorrectAnswered(true);
          }
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
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
      return <QuizAnswerForm task={task} filename={filename} onCorrectAnswer={() => setCorrectAnswered(true)} />;
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
      {correctAnswered && (
        <button
          onClick={async () => {
            const res = await fetch(`${backendUrl}/start_quiz/${filename}/${firebase_uid}`);
            const next = await res.json();
            if (next.next_task) {
              setTask(next.next_task);
              setFeedback("");
              setCorrectAnswered(false);
            } else {
              setFeedback("Quiz complete!");
            }
          }}
        >
          Next Question
        </button>
      )}
    </div>
  );
};

export default QuizTask;
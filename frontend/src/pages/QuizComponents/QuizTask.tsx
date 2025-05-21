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
      correct_option?: string;
      correct_order?: string[];
    };
  };
  filename: string;
  onCorrectAnswer?: () => void; // ✅ NEW PROP
}

const QuizTask: React.FC<TaskProps> = ({ task, filename, onCorrectAnswer }) => {
  const currentUser = getAuth().currentUser;
  const firebase_uid = currentUser?.uid || "";

  const [feedback, setFeedback] = useState("");
  const [inputs, setInputs] = useState<string[]>([]);
  const templateParts = task.quiz.template ? task.quiz.template.split(/§{2,3}/) : [];

  useEffect(() => {
    setInputs(task.quiz.template ? new Array(templateParts.length - 1).fill("") : []);
    setFeedback("");
  }, [task]);

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
        quiz_task_id: task.id,
        user_input: userInput,
        quiz_type: task.quiz.type,
        firebase_uid,
        filename
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          setFeedback(data.message || "Something went wrong.");
        } else {
          setFeedback(data.message);
          if (data.correct && onCorrectAnswer) {
            onCorrectAnswer(); 
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
      return (
        <QuizAnswerForm
          task={task}
          filename={filename}
          onCorrectAnswer={onCorrectAnswer} // Pass down
        />
      );
    } else {
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

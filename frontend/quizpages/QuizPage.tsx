import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuizTask from "./quizcomponents/QuizTask";
import "./QuizPage.css";

type Task = {
  description: string;
  difficulty: string;
  quiz: any;
};

const QuizPage: React.FC = () => {
  const { topic } = useParams<{ topic: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchQuizData = () => {
    setLoading(true);
    setError("");

    fetch(`http://127.0.0.1:5000/load_data/${topic}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load quiz data");
        }
        return response.json();
      })
      .then((data) => {
        setTasks(data.tasks || []); // Default to empty array if no tasks
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading quiz:", error);
        setError("Could not load quiz data. Please try again later.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchQuizData();
  }, [topic]);

  const handleTryAgain = () => {
    fetchQuizData(); // Refetch quiz data
  };

  return (
    <div>
      <h1>Quiz on {topic}</h1>
      {loading ? (
        <p>Loading tasks...</p>
      ) : error ? (
        <p>{error}</p>
      ) : tasks.length > 0 ? (
        <>
          {tasks.map((task, index) => (
            <QuizTask key={index} task={task} />
          ))}
          <button className="try-again-button" onClick={handleTryAgain}>
            Try Again
          </button>
        </>
      ) : (
        <p>No tasks available for this topic.</p>
      )}
    </div>
  );
};

export default QuizPage;

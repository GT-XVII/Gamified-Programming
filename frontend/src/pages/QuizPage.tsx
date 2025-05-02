import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuizTask from "./quizcomponents/QuizTask";
import "./QuizPage.css";

type Task = {
  description: string;
  difficulty: string;
  quiz: {
    type: string;
    template?: string;
    solutions?: string[];
    solution?: string;
  };
};

const QuizPage: React.FC = () => {
  const { topic } = useParams<{ topic: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);

  const fetchQuizData = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(`http://127.0.0.1:5050/load_data/${topic}.json`);
      if (!response.ok) {
        throw new Error("Failed to load quiz data");
      }
      const data = await response.json();
      setTasks(data.tasks || []);
      setCurrentTaskIndex(0); // Reset to the first task
    } catch (err) {
      console.error("Error loading quiz data:", err);
      setError("Could not load quiz data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, [topic]);

  const handleNextTask = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousTask = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleTryAgain = () => {
    fetchQuizData();
  };

  return (
    <div className="quiz-container">
      <h1>Quiz on {topic}</h1>
      {loading ? (
        <p>Loading tasks...</p>
      ) : error ? (
        <p>{error}</p>
      ) : tasks.length > 0 ? (
        <div className="quiz-slideshow">
          <QuizTask task={tasks[currentTaskIndex]} />
          <div className="navigation-buttons">
            <button onClick={handlePreviousTask} disabled={currentTaskIndex === 0}>
              Previous
            </button>
            <button
              onClick={handleNextTask}
              disabled={currentTaskIndex === tasks.length - 1}
            >
              Next
            </button>
          </div>
          <p>
            Task {currentTaskIndex + 1} of {tasks.length}
          </p>
          <button className="try-again-button" onClick={handleTryAgain}>
            Try Again
          </button>
        </div>
      ) : (
        <p>No tasks available for this topic.</p>
      )}
    </div>
  );
};

export default QuizPage;
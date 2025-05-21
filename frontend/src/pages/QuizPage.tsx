/// <reference types="vite/client" />
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuizTask from "./quizcomponents/QuizTask";
import "./QuizPage.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

type Task = {
  id: string;
  description: string;
  difficulty: string;
  quiz: {
    type: string;
    template?: string;
    solutions?: string[];
    solution?: string;
    correct_option?: string;
    correct_order?: string[];
  };
};

const QuizPage: React.FC = () => {
  const { topic } = useParams<{ topic: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentTask = tasks[currentIndex] || null;

  const fetchQuizData = async () => {
    try {
      setLoading(true);
      setError("");
      const firebase_uid = localStorage.getItem("firebase_uid");
      const response = await fetch(`${backendUrl}/start_quiz/${topic}.json/${firebase_uid}`);
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to load quiz data");
      }
      const data = await response.json();
      setTasks(data.tasks || []);
      const nextTask = data.next_task;
      if (nextTask) {
        const index = data.tasks.findIndex((t: Task) => t.id === nextTask.id);
        setCurrentIndex(index >= 0 ? index : 0);
      } else {
        setCurrentIndex(0);
      }
    } catch (err: any) {
      console.error("Error loading quiz data:", err);
      setError(err.message || "Could not load quiz data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizData();
  }, [topic]);

  const handleNext = () => {
    if (currentIndex < tasks.length - 1) {
      setCurrentIndex(currentIndex + 1);
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
      ) : tasks.length > 0 && currentTask ? (
        <div className="quiz-slideshow">
          <p className="quiz-progress">
            Question {currentIndex + 1} of {tasks.length}
          </p>
          <QuizTask
            key={currentTask.id}
            task={currentTask}
            filename={`${topic}.json`}
            setTask={() => {}}
          />
          <div className="navigation-buttons">
            <button
              onClick={handleNext}
              disabled={currentIndex >= tasks.length - 1}
            >
              Next
            </button>
          </div>
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

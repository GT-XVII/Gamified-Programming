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
  };
};

const QuizPage: React.FC = () => {
  const { topic } = useParams<{ topic: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const fetchQuizData = async () => {
    try {
      setLoading(true);
      setError("");
      const firebase_uid = localStorage.getItem("firebase_uid");
      const response = await fetch(`${backendUrl}/start_quiz/${topic}.json/${firebase_uid}`);
      if (!response.ok) {
        throw new Error("Failed to load quiz data");
      }
      const data = await response.json();
      setTasks(data.tasks || []);
      setCurrentTask(data.next_task || data.tasks[0]);
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
          <QuizTask key={currentTask.id} task={currentTask} filename={`${topic}.json`} setTask={setCurrentTask} />
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
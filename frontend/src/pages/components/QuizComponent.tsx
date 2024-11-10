import React, { useState, useEffect } from "react";

// shape of the quiz data
interface Quiz {
  description: string;
  difficulty: string;
  quiz: {
    type: string;
    solution: string;
  };
}

// state variables 
const QuizComponent: React.FC = () => {
  const [quizData, setQuizData] = useState<Quiz | null>(null); // store the actual quiz data 
  const [answer, setAnswer] = useState<string>(""); // stores the user’s answer 
  const [result, setResult] = useState<string | null>(null); // stores the result of the quiz

  // Fetch quiz data from the Flask API
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/get-game-data/booleans");//Request to http://127.0.0.1:5000/api/get-game-data/booleans to get the quiz
        const data = await response.json();
        if (data.error) {
          setResult(`Error: ${data.error}`);
        } else {
          setQuizData(data);
        }
      } catch (error) {
        setResult("An error occurred while fetching quiz data.");
      }
    };

    fetchQuiz();
  }, []);

  // Handle the answer submission,  called when the user submits their answer
  const handleSubmit = async () => {
    // check if there's quiz data and if the user has given an answer
    if (quizData && answer) {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/check-answer", { // send the user's answer to the Flask API at http://127.0.0.1:5000/api/check-answer 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task: quizData,
            answer: answer,
          }),
        });

        const data = await response.json();
        if (data.result === "correct") {
          setResult("Correct! Well done.");
        } else {
          setResult("Incorrect. Try again!");
        }
      } catch (error) {
        setResult("Error checking answer.");
      }
    }
  };
  // If quizData hasn’t been loaded yet, show the text "Loading..."
  if (!quizData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="quiz-container p-6">
      <h2 className="text-xl font-semibold mb-4">{quizData.description}</h2>
      <div className="text-lg mb-4">Difficulty: {quizData.difficulty}</div>
      <div className="mb-4">
        <label htmlFor="answer" className="block">Your Answer:</label>
        <input
          type="text"
          id="answer"
          className="border p-2 mt-2 w-full"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg"
      >
        Submit Answer
      </button>

      {result && <div className="mt-4 text-lg">{result}</div>}
    </div>
  );
};

export default QuizComponent;


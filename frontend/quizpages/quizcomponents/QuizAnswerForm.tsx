// sends the user’s answer to the /check_answer endpoint and displays whether the answer is correct

import React, { useState } from 'react';

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
  const [input, setInput] = useState(''); // Used for coding-quiz
  const [feedback, setFeedback] = useState('');
  const [forceRender, setForceRender] = useState(0); // Dummy state to force re-render

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Determine what to send based on the quiz type
    const inputToSend = userInputs && userInputs.length > 0
      ? userInputs.join(' ') // Join userInputs for fillout-quiz
      : input; // Use single input for coding-quiz

    console.log("Submitting:", { task_description: task.description, user_input: inputToSend }); // Debugging log

    fetch('http://127.0.0.1:5000/check_answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        task_description: task.description,
        user_input: inputToSend,
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => {
        console.log("Feedback message received:", data.message); // Debugging log
        setFeedback(data.message); // Set the feedback state
        setForceRender((prev) => prev + 1); // Trigger a re-render
      })
      .catch((error) => {
        console.error('Error checking answer:', error);
        setFeedback('Error checking answer.');
      });
  };

  // Check feedback after a short delay to confirm if it updates
  setTimeout(() => {
    console.log("Feedback after delay:", feedback);
  }, 1000);

  return (
    <form onSubmit={handleSubmit}>
      {task.quiz.type === 'coding-quiz' && (
        <div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your solution"
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
      )}
      <button type="submit">Submit Answer</button>
      
      {/* Display feedback in a div instead of a conditional p tag for testing */}
      <div style={{ border: "1px solid black", padding: "5px", color: feedback.includes("Incorrect") ? "red" : "green" }}>
        {feedback}
      </div>
    </form>
  );
};

export default QuizAnswerForm;

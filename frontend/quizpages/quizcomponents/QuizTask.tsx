// displays individual quiz tasks and accepts user inputs
// Depending on the task type (e.g., "fillout-quiz" or "coding-quiz"), it displays different input forms.

import React, { useState } from 'react';
import QuizAnswerForm from './QuizAnswerForm';

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
  const [feedback, setFeedback] = useState(''); 

  if (task.quiz.type === 'fillout-quiz' && task.quiz.template) {
    // Split by '§§§' or '§§' using a regex pattern to be flexible with placeholder format
    const templateParts = task.quiz.template.split(/§{2,3}/);
    const [inputs, setInputs] = useState<string[]>(new Array(templateParts.length - 1).fill(''));

    const handleInputChange = (index: number, value: string) => {
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const userInput = inputs.join(' '); 
      fetch('http://127.0.0.1:5000/check_answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task_description: task.description,
          user_input: userInput,
        }),
      })
        .then((response) => response.json())
        .then((data) => setFeedback(data.message)) 
        .catch((error) => {
          console.error('Error checking answer:', error);
          setFeedback('Error checking answer.');
        });
    };

    return (
      <div className="quiz-task">
        <h3>{task.description}</h3>
        <form onSubmit={handleSubmit}>
          <p>
            {templateParts.map((part, index) => (
              <span key={index}>
                {part}
                {index < templateParts.length - 1 && (
                  <input
                    type="text"
                    value={inputs[index] || ''}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    placeholder="___"
                    style={{ width: '50px', margin: '0 5px' }}
                  />
                )}
              </span>
            ))}
          </p>
          <button type="submit">Submit Answer</button>
        </form>
        {feedback && <p className="feedback">{feedback}</p>} {/* Display feedback */}
      </div>
    );
  } else if (task.quiz.type === 'coding-quiz') {
    return (
      <div className="quiz-task">
        <h3>{task.description}</h3>
        <p>Enter the complete code solution:</p>
        <QuizAnswerForm task={task} />
      </div>
    );
  } else {
    return <p>Unknown quiz type</p>;
  }
};

export default QuizTask;
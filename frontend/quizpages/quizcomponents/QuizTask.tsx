// displays individual quiz tasks and accepts user inputs
// Depending on the task type (e.g., "fillout-quiz" or "coding-quiz"), it displays different input forms.

import React from 'react';
import QuizAnswerForm from './QuizAnswerForm';



interface TaskProps {
  task: {
    description: string;
    quiz: {
      type: string;
      solutions?: string[];
      solution?: string;
    };
  };
}

const QuizTask: React.FC<TaskProps> = ({ task }) => {
  return (
    <div>
      <h3>{task.description}</h3>
      <QuizAnswerForm task={task} />
    </div>
  );
};

export default QuizTask;

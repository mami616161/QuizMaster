import React from "react";
import { Progress } from "../ui/progress";

interface ProgressBarProps {
  currentQuestion?: number;
  totalQuestions?: number;
}

const ProgressBar = ({
  currentQuestion = 1,
  totalQuestions = 10,
}: ProgressBarProps) => {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between mb-2 text-sm text-gray-600">
        <span>
          Question {currentQuestion} of {totalQuestions}
        </span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default ProgressBar;

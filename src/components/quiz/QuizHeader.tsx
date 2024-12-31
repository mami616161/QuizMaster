import React from "react";
import { Timer, Trophy } from "lucide-react";
import { Card } from "../ui/card";

interface QuizHeaderProps {
  timeRemaining?: number;
  score?: number;
  totalQuestions?: number;
}

const QuizHeader = ({
  timeRemaining = 300, // 5 minutes in seconds
  score = 0,
  totalQuestions = 10,
}: QuizHeaderProps) => {
  // Format time remaining into mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="w-full h-20 bg-background border-b">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Timer className="w-5 h-5" />
            <span className="text-lg font-medium">
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Trophy className="w-5 h-5" />
            <span className="text-lg font-medium">
              Score: {score}/{totalQuestions}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuizHeader;

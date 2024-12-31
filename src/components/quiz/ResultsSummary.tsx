import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Trophy, RefreshCw } from "lucide-react";

interface ResultsSummaryProps {
  score?: number;
  totalQuestions?: number;
  timeTaken?: number;
  onRetry?: () => void;
}

const ResultsSummary = ({
  score = 8,
  totalQuestions = 10,
  timeTaken = 300,
  onRetry = () => {},
}: ResultsSummaryProps) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="flex justify-center items-center min-h-[600px] bg-background p-4">
      <Card className="w-[800px]">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold flex items-center justify-center gap-3">
            <Trophy className="h-8 w-8 text-yellow-500" />
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="text-center space-y-6">
              <div className="text-6xl font-bold text-primary">
                {percentage}%
              </div>
              <div className="text-xl text-muted-foreground">
                You scored {score} out of {totalQuestions} questions
              </div>
            </div>

            <div className="bg-muted p-6 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-sm text-muted-foreground">
                    Total Questions
                  </div>
                  <div className="text-2xl font-semibold">{totalQuestions}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Time Taken
                  </div>
                  <div className="text-2xl font-semibold">
                    {formatTime(timeTaken)}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={onRetry}
                className="w-full max-w-[200px]"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsSummary;

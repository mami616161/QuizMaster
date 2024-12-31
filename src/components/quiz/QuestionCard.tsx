import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface Answer {
  id: string;
  text: string;
}

interface QuestionCardProps {
  question?: string;
  answers?: Answer[];
  selectedAnswer?: string | null;
  onAnswerSelect?: (answerId: string) => void;
  isAnswerCorrect?: boolean | null;
}

const QuestionCard = ({
  question = "What is the capital of France?",
  answers = [
    { id: "1", text: "Paris" },
    { id: "2", text: "London" },
    { id: "3", text: "Berlin" },
    { id: "4", text: "Madrid" },
  ],
  selectedAnswer = null,
  onAnswerSelect = () => {},
  isAnswerCorrect = null,
}: QuestionCardProps) => {
  return (
    <Card className="w-[800px] h-[500px] mx-auto bg-white">
      <CardContent className="p-6 h-full flex flex-col">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">{question}</h2>
        </div>

        <div className="grid grid-cols-1 gap-4 flex-grow">
          {answers.map((answer) => (
            <Button
              key={answer.id}
              variant="outline"
              className={cn(
                "h-16 text-lg justify-start px-6 transition-all",
                "hover:scale-[1.02] hover:shadow-md",
                selectedAnswer === answer.id && "ring-2 ring-primary",
                selectedAnswer === answer.id &&
                  isAnswerCorrect &&
                  "bg-green-100",
                selectedAnswer === answer.id &&
                  isAnswerCorrect === false &&
                  "bg-red-100",
              )}
              onClick={() => onAnswerSelect(answer.id)}
              disabled={selectedAnswer !== null}
            >
              {answer.text}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;

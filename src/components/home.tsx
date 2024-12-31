import React, { useState, useEffect } from "react";
import QuizHeader from "./quiz/QuizHeader";
import QuestionCard from "./quiz/QuestionCard";
import ProgressBar from "./quiz/ProgressBar";
import ResultsSummary from "./quiz/ResultsSummary";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  Atom,
  Globe2,
  Palette,
  BookOpen,
  Leaf,
  Volume2,
  VolumeX,
} from "lucide-react";
import { soundManager } from "../lib/sounds";

interface Question {
  id: string;
  text: string;
  category: string;
  answers: Array<{
    id: string;
    text: string;
  }>;
}

const categories = [
  { id: "science", name: "Science", icon: Atom, color: "text-blue-500" },
  { id: "geography", name: "Geography", icon: Globe2, color: "text-green-500" },
  { id: "art", name: "Art & Culture", icon: Palette, color: "text-purple-500" },
  { id: "history", name: "History", icon: BookOpen, color: "text-amber-500" },
  { id: "nature", name: "Nature", icon: Leaf, color: "text-emerald-500" },
];

const INITIAL_TIME = 300; // 5 minutes in seconds

const Home = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(INITIAL_TIME);
  const [timeTaken, setTimeTaken] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (selectedCategory && !showResults && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setShowResults(true);
            setTimeTaken(INITIAL_TIME - prev);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [selectedCategory, showResults, timeRemaining]);

  // Questions organized by categories
  const questions: Question[] = [
    // Science Questions
    {
      id: "q1",
      category: "science",
      text: "Which planet is known as the Red Planet?",
      answers: [
        { id: "a1", text: "Mars" },
        { id: "a2", text: "Venus" },
        { id: "a3", text: "Jupiter" },
        { id: "a4", text: "Mercury" },
      ],
    },
    {
      id: "q2",
      category: "science",
      text: "Which element has the chemical symbol 'Au'?",
      answers: [
        { id: "a5", text: "Gold" },
        { id: "a6", text: "Silver" },
        { id: "a7", text: "Copper" },
        { id: "a8", text: "Aluminum" },
      ],
    },
    // Geography Questions
    {
      id: "q3",
      category: "geography",
      text: "What is the capital of Japan?",
      answers: [
        { id: "a9", text: "Tokyo" },
        { id: "a10", text: "Seoul" },
        { id: "a11", text: "Beijing" },
        { id: "a12", text: "Bangkok" },
      ],
    },
    {
      id: "q4",
      category: "geography",
      text: "Which country is known as the Land of the Rising Sun?",
      answers: [
        { id: "a13", text: "Japan" },
        { id: "a14", text: "China" },
        { id: "a15", text: "Korea" },
        { id: "a16", text: "Vietnam" },
      ],
    },
    // Art & Culture Questions
    {
      id: "q5",
      category: "art",
      text: "Who painted the Mona Lisa?",
      answers: [
        { id: "a17", text: "Leonardo da Vinci" },
        { id: "a18", text: "Pablo Picasso" },
        { id: "a19", text: "Vincent van Gogh" },
        { id: "a20", text: "Michelangelo" },
      ],
    },
    {
      id: "q6",
      category: "art",
      text: "Which artistic movement did Andy Warhol belong to?",
      answers: [
        { id: "a21", text: "Pop Art" },
        { id: "a22", text: "Impressionism" },
        { id: "a23", text: "Surrealism" },
        { id: "a24", text: "Cubism" },
      ],
    },
    // History Questions
    {
      id: "q7",
      category: "history",
      text: "In which year did World War II end?",
      answers: [
        { id: "a25", text: "1945" },
        { id: "a26", text: "1944" },
        { id: "a27", text: "1946" },
        { id: "a28", text: "1943" },
      ],
    },
    {
      id: "q8",
      category: "history",
      text: "Who was the first President of the United States?",
      answers: [
        { id: "a29", text: "George Washington" },
        { id: "a30", text: "Thomas Jefferson" },
        { id: "a31", text: "John Adams" },
        { id: "a32", text: "Benjamin Franklin" },
      ],
    },
    // Nature Questions
    {
      id: "q9",
      category: "nature",
      text: "Which gas do plants absorb from the atmosphere?",
      answers: [
        { id: "a33", text: "Carbon Dioxide" },
        { id: "a34", text: "Oxygen" },
        { id: "a35", text: "Nitrogen" },
        { id: "a36", text: "Hydrogen" },
      ],
    },
    {
      id: "q10",
      category: "nature",
      text: "What is the fastest land animal?",
      answers: [
        { id: "a37", text: "Cheetah" },
        { id: "a38", text: "Lion" },
        { id: "a39", text: "Gazelle" },
        { id: "a40", text: "Leopard" },
      ],
    },
  ];

  const categoryQuestions = selectedCategory
    ? questions.filter((q) => q.category === selectedCategory)
    : [];

  const handleAnswerSelect = (answerId: string) => {
    soundManager.play("click");
    setSelectedAnswer(answerId);
    const correctAnswers = {
      q1: "a1",
      q2: "a5",
      q3: "a9",
      q4: "a13",
      q5: "a17",
      q6: "a21",
      q7: "a25",
      q8: "a29",
      q9: "a33",
      q10: "a37",
    };
    const currentQuestionId = categoryQuestions[currentQuestion - 1].id;
    const isCorrect =
      answerId ===
      correctAnswers[currentQuestionId as keyof typeof correctAnswers];
    setIsAnswerCorrect(isCorrect);
    if (isCorrect) {
      setScore((prev) => prev + 1);
      soundManager.play("correct");
    } else {
      soundManager.play("wrong");
    }

    setTimeout(() => {
      if (currentQuestion < categoryQuestions.length) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
      } else {
        setShowResults(true);
        setTimeTaken(INITIAL_TIME - timeRemaining);
        soundManager.play("complete");
      }
    }, 1500);
  };

  const handleCategorySelect = (categoryId: string) => {
    soundManager.play("click");
    setSelectedCategory(categoryId);
    setCurrentQuestion(1);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setScore(0);
    setShowResults(false);
    setTimeRemaining(INITIAL_TIME);
    setTimeTaken(0);
  };

  const handleRetry = () => {
    setSelectedCategory(null);
    setCurrentQuestion(1);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    setScore(0);
    setShowResults(false);
    setTimeRemaining(INITIAL_TIME);
    setTimeTaken(0);
  };

  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-[1200px] mx-auto">
          <Card className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Choose Your Quiz Category</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsMuted(!isMuted);
                  soundManager.setMuted(!isMuted);
                }}
              >
                {isMuted ? (
                  <VolumeX className="h-6 w-6" />
                ) : (
                  <Volume2 className="h-6 w-6" />
                )}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant="outline"
                    className="h-32 flex flex-col items-center justify-center gap-3 p-6 hover:scale-105 transition-transform"
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <Icon className={`w-8 h-8 ${category.color}`} />
                    <span className="text-lg font-medium">{category.name}</span>
                  </Button>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1200px] mx-auto space-y-6">
        <QuizHeader
          timeRemaining={timeRemaining}
          score={score}
          totalQuestions={categoryQuestions.length}
        />

        {!showResults ? (
          <>
            <div className="flex justify-center mb-8">
              <ProgressBar
                currentQuestion={currentQuestion}
                totalQuestions={categoryQuestions.length}
              />
            </div>

            <div className="flex justify-center">
              <QuestionCard
                question={categoryQuestions[currentQuestion - 1].text}
                answers={categoryQuestions[currentQuestion - 1].answers}
                selectedAnswer={selectedAnswer}
                onAnswerSelect={handleAnswerSelect}
                isAnswerCorrect={isAnswerCorrect}
              />
            </div>
          </>
        ) : (
          <ResultsSummary
            score={score}
            totalQuestions={categoryQuestions.length}
            timeTaken={timeTaken}
            onRetry={handleRetry}
          />
        )}
      </div>
    </div>
  );
};

export default Home;

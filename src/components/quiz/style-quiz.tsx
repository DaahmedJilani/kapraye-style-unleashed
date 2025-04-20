
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

interface QuizQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    image?: string;
  }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: "style-preference",
    question: "What's your preferred style?",
    options: [
      { id: "casual", text: "Casual and Comfortable" },
      { id: "formal", text: "Formal and Professional" },
      { id: "trendy", text: "Trendy and Fashion-Forward" },
      { id: "classic", text: "Classic and Timeless" }
    ]
  },
  {
    id: "color-preference",
    question: "Which color palette do you prefer?",
    options: [
      { id: "neutral", text: "Neutral (Black, White, Gray, Beige)" },
      { id: "warm", text: "Warm (Red, Orange, Yellow)" },
      { id: "cool", text: "Cool (Blue, Green, Purple)" },
      { id: "vibrant", text: "Vibrant (Mix of Bold Colors)" }
    ]
  }
];

export function StyleQuiz() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [quizQuestions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // In a real app, we would send these answers to an API
      // and get personalized recommendations
      navigate("/recommendations", { state: { answers } });
    }
  };

  const currentQuestionData = quizQuestions[currentQuestion];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-playfair text-center">
              Personal Style Quiz
            </CardTitle>
            <CardDescription className="text-center">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <h3 className="text-lg font-medium">{currentQuestionData.question}</h3>
              <RadioGroup
                onValueChange={handleAnswer}
                value={answers[currentQuestionData.id]}
                className="space-y-3"
              >
                {currentQuestionData.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label htmlFor={option.id}>{option.text}</Label>
                  </div>
                ))}
              </RadioGroup>
              <Button
                className="w-full bg-kapraye-burgundy hover:bg-kapraye-burgundy/90"
                onClick={handleNext}
                disabled={!answers[currentQuestionData.id]}
              >
                {currentQuestion === quizQuestions.length - 1 ? "See Results" : "Next Question"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

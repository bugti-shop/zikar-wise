import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RotateCcw, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface ZikarCounterProps {
  zikarName: string;
  zikarArabic: string;
  targetCount: number;
  onCountChange?: (count: number) => void;
  onComplete?: (count: number) => void;
}

export const ZikarCounter = ({ zikarName, zikarArabic, targetCount, onCountChange, onComplete }: ZikarCounterProps) => {
  const [count, setCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  // Reset completion flag when zikar or target changes
  useEffect(() => {
    setHasCompleted(false);
  }, [zikarName, targetCount]);

  useEffect(() => {
    onCountChange?.(count);
    
    // Trigger onComplete when target is reached
    if (count >= targetCount && !hasCompleted && count > 0) {
      setHasCompleted(true);
      onComplete?.(count);
    }
  }, [count, targetCount, onCountChange, onComplete, hasCompleted]);

  const handleIncrement = () => {
    if (count < targetCount) {
      setCount(count + 1);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const handleReset = () => {
    setCount(0);
    setHasCompleted(false); // Allow new history entry after reset
  };

  const progress = (count / targetCount) * 100;
  const isComplete = count >= targetCount;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      {/* Zikar Name Display */}
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-arabic font-bold text-islamic-green" dir="rtl">{zikarArabic}</h2>
        <p className="text-lg text-muted-foreground">{zikarName}</p>
      </div>

      {/* Counter Card */}
      <Card className="w-full p-8 relative overflow-hidden bg-gradient-to-br from-card to-muted border-2 border-border">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
          <div
            className="h-full bg-gradient-to-r from-islamic-green to-islamic-teal transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Count Display */}
        <div className="text-center mb-6">
          <div
            className={cn(
              "text-7xl font-bold transition-all duration-300",
              isAnimating && "animate-count-pulse",
              isComplete ? "text-accent" : "text-islamic-teal"
            )}
          >
            {count}
          </div>
          <div className="text-sm text-muted-foreground mt-2 flex items-center justify-center gap-2">
            <Target className="w-4 h-4" />
            <span>Target: {targetCount}</span>
          </div>
        </div>

        {/* Counter Button */}
        <button
          onClick={handleIncrement}
          disabled={isComplete}
          className={cn(
            "w-full h-32 rounded-xl font-semibold text-xl transition-all duration-300 relative overflow-hidden",
            "focus:outline-none focus:ring-4 focus:ring-ring",
            isComplete
              ? "bg-accent/20 text-accent cursor-not-allowed"
              : "bg-gradient-to-br from-islamic-green to-islamic-teal text-white hover:shadow-lg active:scale-95"
          )}
        >
          {isComplete ? (
            <span className="flex items-center justify-center gap-2">
              ✓ Completed
            </span>
          ) : (
            "Tap to Count"
          )}
          {isAnimating && !isComplete && (
            <span className="absolute inset-0 rounded-xl bg-white/20 animate-ripple" />
          )}
        </button>

        {/* Reset Button */}
        <Button
          onClick={handleReset}
          variant="ghost"
          size="sm"
          className="w-full mt-4 text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset Counter
        </Button>
      </Card>

      {/* Completion Message */}
      {isComplete && (
        <div className="text-center animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
          <p className="text-xl font-semibold text-accent">
            Alhamdulillah! 🌙
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            You've completed your Zikar
          </p>
        </div>
      )}
    </div>
  );
};

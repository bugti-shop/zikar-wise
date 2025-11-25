import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const PRESET_TARGETS = [33, 99, 100, 500, 1000];

interface TargetSelectorProps {
  currentTarget: number;
  onTargetChange: (target: number) => void;
}

export const TargetSelector = ({ currentTarget, onTargetChange }: TargetSelectorProps) => {
  const [customTarget, setCustomTarget] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handlePresetClick = (target: number) => {
    onTargetChange(target);
    setShowCustomInput(false);
    setCustomTarget("");
  };

  const handleCustomSubmit = () => {
    const target = parseInt(customTarget);
    if (target > 0 && target <= 10000) {
      onTargetChange(target);
      setShowCustomInput(false);
      setCustomTarget("");
    }
  };

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
        Set Target Count
      </h3>

      {/* Preset Targets */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {PRESET_TARGETS.map((target) => (
          <Button
            key={target}
            onClick={() => handlePresetClick(target)}
            variant={currentTarget === target ? "default" : "outline"}
            className={cn(
              "relative",
              currentTarget === target && "bg-islamic-teal hover:bg-islamic-teal/90"
            )}
          >
            {target}
            {currentTarget === target && (
              <Check className="w-3 h-3 absolute -top-1 -right-1 text-white" />
            )}
          </Button>
        ))}
      </div>

      {/* Custom Target */}
      {showCustomInput ? (
        <div className="space-y-2">
          <Label htmlFor="custom-target">Custom Target (1-10000)</Label>
          <div className="flex gap-2">
            <Input
              id="custom-target"
              type="number"
              min="1"
              max="10000"
              value={customTarget}
              onChange={(e) => setCustomTarget(e.target.value)}
              placeholder="Enter custom target"
              className="flex-1"
            />
            <Button
              onClick={handleCustomSubmit}
              disabled={!customTarget || parseInt(customTarget) <= 0 || parseInt(customTarget) > 10000}
              className="bg-islamic-green hover:bg-islamic-green/90"
            >
              Set
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowCustomInput(false);
              setCustomTarget("");
            }}
            className="w-full text-muted-foreground"
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          onClick={() => setShowCustomInput(true)}
          className="w-full border-dashed"
        >
          Custom Target
        </Button>
      )}
    </Card>
  );
};

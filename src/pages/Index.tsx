import { useState } from "react";
import { ZikarCounter } from "@/components/ZikarCounter";
import { ZikarSelector, ZIKAR_OPTIONS, type Zikar } from "@/components/ZikarSelector";
import { TargetSelector } from "@/components/TargetSelector";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const [selectedZikar, setSelectedZikar] = useState<Zikar>(ZIKAR_OPTIONS[0]);
  const [targetCount, setTargetCount] = useState(selectedZikar.defaultTarget);

  const handleZikarChange = (zikar: Zikar) => {
    setSelectedZikar(zikar);
    setTargetCount(zikar.defaultTarget);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-islamic-green to-islamic-teal bg-clip-text text-transparent">
              Zikar Counter
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Remember Allah with every count
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Zikar Selector */}
        <section>
          <ZikarSelector
            selectedZikar={selectedZikar}
            onSelectZikar={handleZikarChange}
          />
        </section>

        <Separator className="my-8" />

        {/* Target Selector */}
        <section>
          <TargetSelector
            currentTarget={targetCount}
            onTargetChange={setTargetCount}
          />
        </section>

        <Separator className="my-8" />

        {/* Counter */}
        <section>
          <ZikarCounter
            zikarName={selectedZikar.name}
            zikarArabic={selectedZikar.arabic}
            targetCount={targetCount}
          />
        </section>

        {/* Info Card */}
        <Card className="max-w-2xl mx-auto p-6 bg-muted/50 border-islamic-green/20">
          <h3 className="font-semibold text-foreground mb-2">How to Use</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Select your preferred Zikar from the options above</li>
            <li>• Set your target count (preset or custom)</li>
            <li>• Tap the counter button to increment your count</li>
            <li>• Complete your Zikar with focus and sincerity</li>
          </ul>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            May Allah accept your Zikar and grant you peace 🌙
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

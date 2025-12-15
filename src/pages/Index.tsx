import { useState } from "react";
import { ZikarCounter } from "@/components/ZikarCounter";
import { ZikarSelector, type Zikar } from "@/components/ZikarSelector";
import { TargetSelector } from "@/components/TargetSelector";
import { AddCustomZikar } from "@/components/AddCustomZikar";
import { ZikarHistory } from "@/components/ZikarHistory";
import { ZikarStatistics } from "@/components/ZikarStatistics";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCustomZikar } from "@/hooks/useCustomZikar";
import { useZikarHistory } from "@/hooks/useZikarHistory";
import { COMMON_ZIKAR } from "@/data/zikarPacks";
import { toast } from "sonner";
import qalbifyLogo from "@/assets/qalbify-logo.jpg";

const Index = () => {
  const { customZikars, addCustomZikar, removeCustomZikar } = useCustomZikar();
  const { history, addHistoryEntry, clearHistory } = useZikarHistory();
  const [selectedZikar, setSelectedZikar] = useState<Zikar>(COMMON_ZIKAR[0]);
  const [targetCount, setTargetCount] = useState(selectedZikar.defaultTarget);
  const [showAddCustom, setShowAddCustom] = useState(false);

  const handleZikarComplete = (count: number) => {
    addHistoryEntry({
      zikarName: selectedZikar.name,
      zikarArabic: selectedZikar.arabic,
      count,
      target: targetCount,
    });
    toast.success("Zikr recorded in history!");
  };

  const handleZikarChange = (zikar: Zikar) => {
    setSelectedZikar(zikar);
    setTargetCount(zikar.defaultTarget);
    setShowAddCustom(false);
  };

  const handleAddCustomZikar = (zikar: Zikar) => {
    addCustomZikar(zikar);
    setSelectedZikar(zikar);
    setTargetCount(zikar.defaultTarget);
    setShowAddCustom(false);
  };

  const handleDeleteCustomZikar = (id: string) => {
    removeCustomZikar(id);
    toast.success("Custom Zikr removed");
    
    // If the deleted zikar was selected, switch to first common zikar
    if (selectedZikar.id === id) {
      setSelectedZikar(COMMON_ZIKAR[0]);
      setTargetCount(COMMON_ZIKAR[0].defaultTarget);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center gap-3">
            <img 
              src={qalbifyLogo} 
              alt="Qalbify Logo" 
              className="w-10 h-10 rounded-lg object-cover"
            />
            <h1 className="text-xl font-bold bg-gradient-to-r from-islamic-green to-islamic-teal bg-clip-text text-transparent">
              Qalbify
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Zikar Selector or Add Custom Form */}
        <section>
          {showAddCustom ? (
            <AddCustomZikar
              onAdd={handleAddCustomZikar}
              onCancel={() => setShowAddCustom(false)}
            />
          ) : (
            <ZikarSelector
              selectedZikar={selectedZikar}
              onSelectZikar={handleZikarChange}
              customZikars={customZikars}
              onDeleteCustomZikar={handleDeleteCustomZikar}
              onAddCustomClick={() => setShowAddCustom(true)}
            />
          )}
        </section>

        {!showAddCustom && (
          <>
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
            onComplete={handleZikarComplete}
          />
        </section>

        <Separator className="my-8" />

        {/* Statistics */}
        <section>
          <ZikarStatistics history={history} />
        </section>

        <Separator className="my-8" />

        {/* History */}
        <section>
          <ZikarHistory history={history} onClearHistory={clearHistory} />
        </section>

            {/* Info Card */}
            <Card className="max-w-2xl mx-auto p-6 bg-muted/50 border-islamic-green/20">
              <h3 className="font-semibold text-foreground mb-2">How to Use</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Choose from Common Zikr, Duas, Daroods, or create custom ones</li>
                <li>• Set your target count (preset or custom)</li>
                <li>• Tap the counter button to increment your count</li>
                <li>• Your custom Zikr are saved locally on your device</li>
              </ul>
            </Card>
          </>
        )}
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

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface Zikar {
  id: string;
  name: string;
  arabic: string;
  defaultTarget: number;
  transliteration: string;
}

export const ZIKAR_OPTIONS: Zikar[] = [
  {
    id: "subhanallah",
    name: "SubhanAllah",
    arabic: "سُبْحَانَ ٱللَّٰهِ",
    transliteration: "Glory be to Allah",
    defaultTarget: 33,
  },
  {
    id: "alhamdulillah",
    name: "Alhamdulillah",
    arabic: "ٱلْحَمْدُ لِلَّٰهِ",
    transliteration: "All praise is due to Allah",
    defaultTarget: 33,
  },
  {
    id: "allahuakbar",
    name: "Allahu Akbar",
    arabic: "ٱللَّٰهُ أَكْبَرُ",
    transliteration: "Allah is the Greatest",
    defaultTarget: 34,
  },
  {
    id: "lailahaillallah",
    name: "La ilaha illallah",
    arabic: "لَا إِلَٰهَ إِلَّا ٱللَّٰهُ",
    transliteration: "There is no god but Allah",
    defaultTarget: 100,
  },
  {
    id: "astaghfirullah",
    name: "Astaghfirullah",
    arabic: "أَسْتَغْفِرُ ٱللَّٰهَ",
    transliteration: "I seek forgiveness from Allah",
    defaultTarget: 100,
  },
];

interface ZikarSelectorProps {
  selectedZikar: Zikar;
  onSelectZikar: (zikar: Zikar) => void;
}

export const ZikarSelector = ({ selectedZikar, onSelectZikar }: ZikarSelectorProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
        Select Zikar
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {ZIKAR_OPTIONS.map((zikar) => (
          <Card
            key={zikar.id}
            onClick={() => onSelectZikar(zikar)}
            className={cn(
              "p-4 cursor-pointer transition-all duration-300 hover:shadow-md",
              "border-2 hover:border-islamic-teal",
              selectedZikar.id === zikar.id
                ? "border-islamic-teal bg-islamic-teal/5"
                : "border-border bg-card"
            )}
          >
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-islamic-green">
                {zikar.arabic}
              </div>
              <div className="text-sm font-semibold text-foreground">
                {zikar.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {zikar.transliteration}
              </div>
              <div className="text-xs text-accent font-medium pt-1">
                Target: {zikar.defaultTarget}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

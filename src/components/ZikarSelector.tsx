import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Trash2, Plus } from "lucide-react";
import { getZikarPacks, type ZikarPackType } from "@/data/zikarPacks";

export interface Zikar {
  id: string;
  name: string;
  arabic: string;
  defaultTarget: number;
  transliteration: string;
}

interface ZikarSelectorProps {
  selectedZikar: Zikar;
  onSelectZikar: (zikar: Zikar) => void;
  customZikars: Zikar[];
  onDeleteCustomZikar?: (id: string) => void;
  onAddCustomClick?: () => void;
}

export const ZikarSelector = ({ 
  selectedZikar, 
  onSelectZikar, 
  customZikars,
  onDeleteCustomZikar,
  onAddCustomClick 
}: ZikarSelectorProps) => {
  const zikarPacks = getZikarPacks(customZikars);

  const renderZikarCard = (zikar: Zikar, showDelete: boolean = false) => (
    <Card
      key={zikar.id}
      className={cn(
        "p-4 transition-all duration-300 hover:shadow-md relative group",
        "border-2 hover:border-islamic-teal",
        selectedZikar.id === zikar.id
          ? "border-islamic-teal bg-islamic-teal/5"
          : "border-border bg-card"
      )}
    >
      <div 
        onClick={() => onSelectZikar(zikar)}
        className="text-center space-y-2 cursor-pointer"
      >
        <div className="text-3xl font-arabic font-bold text-islamic-green" dir="rtl">
          {zikar.arabic}
        </div>
        <div className="text-sm font-semibold text-foreground">
          {zikar.name}
        </div>
        <div className="text-xs text-muted-foreground line-clamp-2">
          {zikar.transliteration}
        </div>
        <div className="text-xs text-accent font-medium pt-1">
          Target: {zikar.defaultTarget}
        </div>
      </div>
      
      {showDelete && onDeleteCustomZikar && (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteCustomZikar(zikar.id);
          }}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      )}
    </Card>
  );

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
        Select Your Zikr
      </h3>
      
      <Tabs defaultValue="common" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          {zikarPacks.map((pack) => (
            <TabsTrigger 
              key={pack.id} 
              value={pack.id}
              className="text-sm"
            >
              <span className="mr-1">{pack.icon}</span>
              {pack.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {zikarPacks.map((pack) => (
          <TabsContent key={pack.id} value={pack.id} className="space-y-4">
            <div className="text-center mb-4">
              <p className="text-sm text-muted-foreground">{pack.description}</p>
            </div>

            {pack.id === "custom" && pack.items.length === 0 ? (
              <Card className="p-12 text-center border-dashed border-2">
                <div className="space-y-4">
                  <div className="text-4xl">✨</div>
                  <h4 className="text-lg font-semibold text-foreground">
                    No Custom Zikr Yet
                  </h4>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Create your own personalized Zikr with Arabic calligraphy to track your spiritual journey
                  </p>
                  <Button 
                    onClick={onAddCustomClick}
                    className="bg-islamic-green hover:bg-islamic-green/90"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Custom Zikr
                  </Button>
                </div>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pack.items.map((zikar) => renderZikarCard(zikar, pack.id === "custom"))}
                </div>
                
                {pack.id === "custom" && onAddCustomClick && (
                  <Button
                    onClick={onAddCustomClick}
                    variant="outline"
                    className="w-full border-dashed border-2 h-auto py-6 hover:border-islamic-teal hover:bg-islamic-teal/5"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Another Custom Zikr
                  </Button>
                )}
              </>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

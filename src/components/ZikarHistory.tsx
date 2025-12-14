import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, Trash2, Calendar, Clock, Target } from "lucide-react";
import type { ZikarHistoryEntry } from "@/hooks/useZikarHistory";
import { format } from "date-fns";

interface ZikarHistoryProps {
  history: ZikarHistoryEntry[];
  onClearHistory: () => void;
}

export const ZikarHistory = ({ history, onClearHistory }: ZikarHistoryProps) => {
  const groupedByDate = history.reduce((acc, entry) => {
    const date = format(new Date(entry.completedAt), "yyyy-MM-dd");
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(entry);
    return acc;
  }, {} as Record<string, ZikarHistoryEntry[]>);

  const sortedDates = Object.keys(groupedByDate).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 bg-card border-islamic-green/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-islamic-green" />
          <h3 className="text-lg font-semibold text-foreground">Zikr History</h3>
        </div>
        {history.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearHistory}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <History className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No history yet</p>
          <p className="text-sm">Complete a Zikr to see it here</p>
        </div>
      ) : (
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            {sortedDates.map((date) => (
              <div key={date}>
                <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">
                    {format(new Date(date), "EEEE, MMMM d, yyyy")}
                  </span>
                </div>
                <div className="space-y-3 pl-6 border-l-2 border-islamic-green/20">
                  {groupedByDate[date].map((entry) => (
                    <div
                      key={entry.id}
                      className="bg-muted/50 rounded-lg p-4 hover:bg-muted/70 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-arabic text-xl text-islamic-green" dir="rtl">
                            {entry.zikarArabic}
                          </p>
                          <p className="text-sm text-foreground mt-1">{entry.zikarName}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Target className="w-3 h-3" />
                            <span className="font-semibold text-islamic-teal">
                              {entry.count}/{entry.target}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <Clock className="w-3 h-3" />
                            <span>{format(new Date(entry.completedAt), "h:mm a")}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </Card>
  );
};

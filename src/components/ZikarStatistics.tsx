import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Calendar, TrendingUp } from "lucide-react";
import type { ZikarHistoryEntry } from "@/hooks/useZikarHistory";

interface ZikarStatisticsProps {
  history: ZikarHistoryEntry[];
}

export const ZikarStatistics = ({ history }: ZikarStatisticsProps) => {
  const stats = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    let todayCount = 0;
    let weekCount = 0;
    let monthCount = 0;
    let totalCount = 0;
    const zikarBreakdown: Record<string, number> = {};

    history.forEach((entry) => {
      const entryDate = new Date(entry.completedAt);
      totalCount += entry.count;
      
      // Track per-zikar counts
      zikarBreakdown[entry.zikarName] = (zikarBreakdown[entry.zikarName] || 0) + entry.count;

      if (entryDate >= today) {
        todayCount += entry.count;
      }
      if (entryDate >= weekAgo) {
        weekCount += entry.count;
      }
      if (entryDate >= monthAgo) {
        monthCount += entry.count;
      }
    });

    // Sort zikar breakdown by count
    const topZikars = Object.entries(zikarBreakdown)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      today: todayCount,
      week: weekCount,
      month: monthCount,
      total: totalCount,
      topZikars,
      totalSessions: history.length,
    };
  }, [history]);

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-islamic-green" />
        Statistics
      </h3>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="breakdown">Top Zikr</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              label="Today"
              value={stats.today}
              icon={<Calendar className="w-4 h-4" />}
              highlight
            />
            <StatCard
              label="This Week"
              value={stats.week}
              icon={<TrendingUp className="w-4 h-4" />}
            />
            <StatCard
              label="This Month"
              value={stats.month}
              icon={<BarChart3 className="w-4 h-4" />}
            />
            <StatCard
              label="All Time"
              value={stats.total}
              icon={<TrendingUp className="w-4 h-4" />}
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            {stats.totalSessions} total sessions completed
          </p>
        </TabsContent>

        <TabsContent value="breakdown">
          <Card className="p-4 bg-card border-border">
            {stats.topZikars.length > 0 ? (
              <div className="space-y-3">
                {stats.topZikars.map(([name, count], index) => (
                  <div key={name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-islamic-green/20 text-islamic-green text-xs font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <span className="text-foreground font-medium truncate max-w-[180px]">
                        {name}
                      </span>
                    </div>
                    <span className="text-muted-foreground font-semibold">
                      {count.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                No data yet
              </p>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  highlight?: boolean;
}

const StatCard = ({ label, value, icon, highlight }: StatCardProps) => (
  <Card className={`p-4 text-center ${highlight ? 'border-islamic-green/50 bg-islamic-green/5' : 'bg-card border-border'}`}>
    <div className="flex items-center justify-center gap-2 text-muted-foreground mb-1">
      {icon}
      <span className="text-sm">{label}</span>
    </div>
    <p className={`text-2xl font-bold ${highlight ? 'text-islamic-green' : 'text-foreground'}`}>
      {value.toLocaleString()}
    </p>
  </Card>
);

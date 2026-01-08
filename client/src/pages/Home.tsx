import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Droplet,
  AlertCircle,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

/**
 * Design Philosophy: Clinical Minimalism with Warm Neutrals
 * - Warm brown/cream palette with sage green accents
 * - Trend-focused visualizations, no alarm states
 * - Senior-friendly: large type, high contrast, accessible spacing
 * - Asymmetric layout with breathing room
 */

// Mock data for demonstration
const overviewData = {
  gutHealthScore: 72,
  regularityScore: 68,
  digestiveStability: 81,
  weeklyTrend: "stable",
};

const frequencyData = [
  { day: "Mon", events: 1, time: "08:30" },
  { day: "Tue", events: 1, time: "08:45" },
  { day: "Wed", events: 2, time: "08:15, 14:20" },
  { day: "Thu", events: 1, time: "08:50" },
  { day: "Fri", events: 1, time: "08:30" },
  { day: "Sat", events: 0, time: "-" },
  { day: "Sun", events: 1, time: "09:15" },
];

const consistencyData = [
  { week: "Week 1", hard: 15, normal: 70, loose: 15 },
  { week: "Week 2", hard: 12, normal: 75, loose: 13 },
  { week: "Week 3", hard: 18, normal: 68, loose: 14 },
  { week: "Week 4", hard: 14, normal: 72, loose: 14 },
];

const regularityTrendData = [
  { day: 1, score: 65 },
  { day: 2, score: 67 },
  { day: 3, score: 66 },
  { day: 4, score: 68 },
  { day: 5, score: 70 },
  { day: 6, score: 69 },
  { day: 7, score: 68 },
];

const hydrationData = [
  { day: "Mon", water: 2.0, consistency: 72 },
  { day: "Tue", water: 2.2, consistency: 75 },
  { day: "Wed", water: 1.8, consistency: 68 },
  { day: "Thu", water: 2.4, consistency: 78 },
  { day: "Fri", water: 2.1, consistency: 74 },
  { day: "Sat", water: 1.9, consistency: 70 },
  { day: "Sun", water: 2.3, consistency: 76 },
];

const eventLogData = [
  { id: 1, time: "08:30", volume: "Medium", consistency: "Normal", notes: "" },
  { id: 2, time: "14:20", volume: "Small", consistency: "Hard", notes: "After coffee" },
  { id: 3, time: "08:15", volume: "Large", consistency: "Normal", notes: "" },
];

const ScoreRing = ({ score, label }: { score: number; label: string }) => {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted"
          />
          {/* Progress circle */}
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="text-primary transition-all duration-500"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-foreground">{score}</span>
          <span className="text-xs text-muted-foreground">/ 100</span>
        </div>
      </div>
      <p className="text-sm font-medium text-foreground text-center">{label}</p>
    </div>
  );
};

const TrendBadge = ({ direction, value }: { direction: "up" | "down" | "stable"; value: string }) => {
  const colors = {
    up: "bg-amber-50 text-amber-700 border-amber-200",
    down: "bg-blue-50 text-blue-700 border-blue-200",
    stable: "bg-green-50 text-green-700 border-green-200",
  };

  const icons = {
    up: <TrendingUp className="w-4 h-4" />,
    down: <TrendingDown className="w-4 h-4" />,
    stable: <div className="w-4 h-4 flex items-center justify-center">—</div>,
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${colors[direction]}`}>
      {icons[direction]}
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
};

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-2xl font-bold text-foreground">Ventre</h1>
          </div>
          <div className="text-sm text-muted-foreground">Gut Health Dashboard</div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside
          className={`fixed lg:static top-16 left-0 right-0 bottom-0 lg:bottom-auto w-full lg:w-64 bg-sidebar border-r border-sidebar-border z-30 transform transition-transform lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="p-4 space-y-2">
            <button className="w-full text-left px-4 py-3 rounded-lg bg-sidebar-accent text-sidebar-accent-foreground font-medium transition-colors">
              Overview
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-sidebar-accent/20 text-sidebar-foreground transition-colors">
              Frequency & Timing
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-sidebar-accent/20 text-sidebar-foreground transition-colors">
              Consistency Trends
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-sidebar-accent/20 text-sidebar-foreground transition-colors">
              Regularity & Rhythm
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-sidebar-accent/20 text-sidebar-foreground transition-colors">
              Correlations
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-sidebar-accent/20 text-sidebar-foreground transition-colors">
              Event Log
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Overview Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-8">Overview</h2>

            {/* Score Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="p-6 flex flex-col items-center justify-center">
                <ScoreRing score={overviewData.gutHealthScore} label="Gut Health Score" />
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Composite measure of digestive health based on frequency, consistency, and regularity patterns.
                </p>
              </Card>

              <Card className="p-6 flex flex-col items-center justify-center">
                <ScoreRing score={overviewData.regularityScore} label="Regularity Score" />
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Measures consistency of bowel timing and day-to-day frequency stability.
                </p>
              </Card>

              <Card className="p-6 flex flex-col items-center justify-center">
                <ScoreRing score={overviewData.digestiveStability} label="Digestive Stability" />
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  Indicates how stable your digestive patterns are this week.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Weekly Trend</p>
                    <TrendBadge direction="stable" value="Stable Pattern" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">This Week</p>
                    <p className="text-2xl font-bold text-foreground">6 events</p>
                    <p className="text-xs text-muted-foreground mt-1">Average: 0.86/day</p>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">Last week: 7 events</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Insights Feed */}
            <Card className="p-6 mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Insights</h3>
              <div className="space-y-4">
                <div className="flex gap-3 p-3 bg-secondary rounded-lg">
                  <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-foreground">
                      Your digestive timing became less consistent last week.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Regularity score decreased from 72 to 68. This is within normal variation.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 bg-secondary rounded-lg">
                  <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-foreground">
                      Higher water intake has been associated with softer stool consistency for you.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Confidence level: Medium. Based on 4 weeks of data.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Tabs for Additional Sections */}
          <Tabs defaultValue="frequency" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="frequency">Frequency</TabsTrigger>
              <TabsTrigger value="consistency">Consistency</TabsTrigger>
              <TabsTrigger value="regularity">Regularity</TabsTrigger>
              <TabsTrigger value="correlations">Correlations</TabsTrigger>
            </TabsList>

            {/* Frequency Tab */}
            <TabsContent value="frequency" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Frequency</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={frequencyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-card)",
                        border: "1px solid var(--color-border)",
                      }}
                    />
                    <Bar dataKey="events" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-6 p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-foreground">
                    <strong>Average:</strong> 0.86 bowel movements per day
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Missed days: 1 (Saturday). This is within normal variation.
                  </p>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Timing Pattern</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={frequencyData.filter((d) => d.time !== "-")}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
                    <YAxis type="category" dataKey="time" stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-card)",
                        border: "1px solid var(--color-border)",
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <p className="text-sm text-muted-foreground mt-4">
                  Most events occur between 08:15 and 09:15 AM. This is your typical pattern.
                </p>
              </Card>
            </TabsContent>

            {/* Consistency Tab */}
            <TabsContent value="consistency" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Consistency Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={consistencyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="week" stroke="var(--color-muted-foreground)" />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-card)",
                        border: "1px solid var(--color-border)",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="hard" stackId="a" fill="var(--color-chart-4)" name="Hard" />
                    <Bar dataKey="normal" stackId="a" fill="var(--color-chart-1)" name="Normal" />
                    <Bar dataKey="loose" stackId="a" fill="var(--color-chart-2)" name="Loose" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="p-3 bg-secondary rounded-lg">
                    <p className="text-xs text-muted-foreground">Hard</p>
                    <p className="text-lg font-semibold text-foreground">14.75%</p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <p className="text-xs text-muted-foreground">Normal</p>
                    <p className="text-lg font-semibold text-foreground">71.25%</p>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg">
                    <p className="text-xs text-muted-foreground">Loose</p>
                    <p className="text-lg font-semibold text-foreground">14%</p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Regularity Tab */}
            <TabsContent value="regularity" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Regularity Score Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={regularityTrendData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
                    <YAxis domain={[60, 75]} stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-card)",
                        border: "1px solid var(--color-border)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke="var(--color-primary)"
                      fillOpacity={1}
                      fill="url(#colorScore)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
                <p className="text-sm text-muted-foreground mt-4">
                  Your regularity score has been stable this week, ranging from 65 to 70. This indicates consistent bowel timing.
                </p>
              </Card>
            </TabsContent>

            {/* Correlations Tab */}
            <TabsContent value="correlations" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Hydration & Consistency</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={hydrationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
                    <YAxis yAxisId="left" stroke="var(--color-muted-foreground)" />
                    <YAxis yAxisId="right" orientation="right" stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-card)",
                        border: "1px solid var(--color-border)",
                      }}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="water" fill="var(--color-chart-2)" name="Water (L)" />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="consistency"
                      stroke="var(--color-primary)"
                      name="Consistency Score"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
                <div className="mt-6 p-4 bg-secondary rounded-lg">
                  <p className="text-sm font-medium text-foreground mb-2">Associated Pattern</p>
                  <p className="text-sm text-muted-foreground">
                    Higher water intake (2.2L+) has been associated with higher consistency scores (74+). Confidence: Medium.
                  </p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Event Log */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Recent Events</h2>
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-secondary">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Time</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Volume</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Consistency</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventLogData.map((event) => (
                      <tr key={event.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                        <td className="px-6 py-4 text-sm text-foreground">{event.time}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{event.volume}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {event.consistency}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{event.notes || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>
              Ventre tracks patterns over time. One event means nothing. Trends matter.
            </p>
            <p className="mt-2">
              This is not a medical device. Consult a healthcare provider for medical concerns.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}

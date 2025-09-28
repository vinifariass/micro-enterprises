"use client";

import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Calendar,
  CreditCard,
  Download,
  DollarSign,
  FileText,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import type { TooltipProps } from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const KPI_DATA = [
  {
    title: "My Balance",
    value: "$125,430",
    delta: "12.5%",
    deltaLabel: "compared to last month",
    trend: "up" as const,
    icon: Wallet,
  },
  {
    title: "Net Profit",
    value: "$38,700",
    delta: "8.5%",
    deltaLabel: "compared to last month",
    trend: "up" as const,
    icon: TrendingUp,
  },
  {
    title: "Expenses",
    value: "$26,450",
    delta: "5.5%",
    deltaLabel: "compared to last month",
    trend: "down" as const,
    icon: DollarSign,
  },
  {
    title: "Pending Invoices",
    value: "$3,200",
    badge: "3 overdue invoices",
    trend: "neutral" as const,
    icon: FileText,
  },
];

const INCOME_SOURCES = [
  { label: "Rental", amount: "$35,000", colorVar: "--chart-1", width: 38.0435 },
  { label: "Investments", amount: "$28,000", colorVar: "--chart-2", width: 30.4348 },
  { label: "Business", amount: "$18,000", colorVar: "--chart-3", width: 19.5652 },
  { label: "Freelance", amount: "$11,000", colorVar: "--chart-4", width: 11.9565 },
];

const EXPENSES_SERIES = [
  { month: "Jan", value: 32 },
  { month: "Feb", value: 56 },
  { month: "Mar", value: 42 },
  { month: "Apr", value: 52 },
  { month: "May", value: 44 },
  { month: "Jun", value: 46 },
];

const SUMMARY_DATA = [
  { name: "Chrome", value: 38, colorVar: "--chart-1" },
  { name: "Safari", value: 24, colorVar: "--chart-2" },
  { name: "Firefox", value: 20, colorVar: "--chart-3" },
  { name: "Edge", value: 11, colorVar: "--chart-4" },
  { name: "Other", value: 7, colorVar: "--chart-5" },
];

const SPENDING_BREAKDOWN = [
  { label: "Food & Drink", value: "48%", colorVar: "--chart-1" },
  { label: "Grocery", value: "32%", colorVar: "--chart-2" },
  { label: "Shopping", value: "13%", colorVar: "--chart-3" },
  { label: "Transport", value: "7%", colorVar: "--chart-4" },
];

const TRANSACTIONS = [
  {
    customer: "Samantha William",
    date: "30 April 2024, 10:15 AM",
    type: "Income",
    amount: 1640.26,
    positive: true,
    avatar: { fallback: "S", className: "bg-pink-500" },
  },
  {
    customer: "Grocery at Shop",
    date: "29 April 2024, 6:45 PM",
    type: "Expenses",
    amount: -72.64,
    positive: false,
    avatar: { icon: "store", className: "bg-emerald-500" },
  },
  {
    customer: "Coffee",
    date: "21 April 2024, 8:30 AM",
    type: "Expenses",
    amount: -8.65,
    positive: false,
    avatar: { icon: "coffee", className: "bg-amber-500" },
  },
  {
    customer: "Karen Smith",
    date: "10 April 2024, 3:50 PM",
    type: "Income",
    amount: 842.5,
    positive: true,
    avatar: { fallback: "K", className: "bg-purple-500" },
  },
  {
    customer: "Transportation",
    date: "2 April 2024, 5:20 PM",
    type: "Expenses",
    amount: -18.52,
    positive: false,
    avatar: { icon: "car", className: "bg-red-500" },
  },
  {
    customer: "Online Course Purchase",
    date: "12 March 2024, 2:10 PM",
    type: "Expenses",
    amount: -120,
    positive: false,
    avatar: { icon: "book", className: "bg-blue-500" },
  },
  {
    customer: "Freelance Project Payment",
    date: "5 March 2024, 11:00 AM",
    type: "Income",
    amount: 980.75,
    positive: true,
    avatar: { fallback: "F", className: "bg-green-600" },
  },
];

const WALLET_CARDS = [
  {
    title: "Credit Card",
    maskedNumber: "5375 **** **** 2368",
    balance: "$5,325.57",
    gradient: "linear-gradient(135deg, #34d399, #10b981)",
    accent: {
      background: "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0))",
    },
  },
  {
    title: "Digital Card",
    maskedNumber: "5375 **** **** 1847",
    balance: "$10,892.43",
    gradient: "linear-gradient(135deg, #60a5fa, #2563eb)",
    accent: {
      background: "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0))",
    },
  },
  {
    title: "Business Card",
    maskedNumber: "3782 **** **** 5432",
    balance: "$15,743.21",
    gradient: "linear-gradient(135deg, #fb923c, #f97316)",
    accent: {
      background: "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0))",
    },
  },
];

const ICON_MAP: Record<string, JSX.Element> = {
  store: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
    </svg>
  ),
  coffee: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2v2" />
      <path d="M10 2v2" />
      <path d="M14 2v2" />
      <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h12a4 4 0 1 1 0 8h-1" />
    </svg>
  ),
  car: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M9 17h6" />
      <path d="M2 7h20" />
    </svg>
  ),
  book: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 7v14" />
      <path d="M21 20V5a2 2 0 0 0-2-2h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H5a2 2 0 0 0-2 2v15" />
    </svg>
  ),
};

function ExpensesTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-md border bg-white px-3 py-2 text-xs shadow">
      <div className="font-medium text-gray-800">{item.payload.month}</div>
      <div className="text-gray-600">${item.payload.value}k</div>
    </div>
  );
}

export default function FinanceDashboardView() {
  return (
    <div className="@container/main p-4 xl:group-data-[theme-content-layout=centered]/layout:container xl:group-data-[theme-content-layout=centered]/layout:mx-auto space-y-4">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-xl font-bold tracking-tight lg:text-2xl">Finance Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9 gap-2 px-4 text-sm font-normal">
            <Calendar className="size-4" /> 01 Sep 2025 - 28 Sep 2025
          </Button>
          <Button size="icon">
            <Download className="size-4" />
          </Button>
        </div>
      </header>

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {KPI_DATA.map((item) => (
          <Card key={item.title} className="flex flex-col gap-6 py-6">
            <CardHeader className="px-6">
              <div className="flex items-center gap-3 text-sm font-semibold text-muted-foreground">
                <span className="inline-flex size-10 items-center justify-center rounded-md border p-1.5">
                  <item.icon className="size-6" />
                </span>
                {item.title}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="font-display text-3xl">{item.value}</div>
                {item.trend !== "neutral" && (
                  <div className={`flex flex-col text-sm ${item.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    <span className="flex items-center gap-2">
                      {item.trend === "up" ? (
                        <TrendingUp className="size-4" />
                      ) : (
                        <TrendingDown className="size-4" />
                      )}
                      {item.delta}
                    </span>
                    <span className="ml-1 text-muted-foreground">{item.deltaLabel}</span>
                  </div>
                )}
                {item.trend === "neutral" && item.badge && (
                  <Badge variant="outline" className="border-red-400 bg-red-50 text-xs text-red-800">
                    {item.badge}
                  </Badge>
                )}
              </div>
              {item.trend === "up" && (
                <div className="flex gap-2">
                  <Button className="h-9 flex-1 gap-2">
                    <ArrowUp className="size-4" /> Transfer
                  </Button>
                  <Button variant="outline" className="h-9 flex-1 gap-2">
                    <ArrowDown className="size-4" /> Request
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Income Sources */}
        <Card className="flex flex-col gap-6 py-6 xl:col-span-1">
          <CardHeader className="px-6">
            <div className="flex items-center justify-between">
              <div className="text-base font-semibold">Income Sources</div>
              <Button variant="ghost" size="sm" className="h-8 gap-1.5 px-3">
                <ArrowUpRight className="size-4 rotate-45" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="mb-1 text-sm text-muted-foreground">Total Income</div>
              <div className="mb-2 font-display text-3xl">$92,000</div>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="mr-1 size-4" /> 15.5%
                <span className="ml-1 text-muted-foreground">compared to last month</span>
              </div>
            </div>
            <div className="flex h-3 overflow-hidden rounded-full">
              {INCOME_SOURCES.map((item) => (
                <div
                  key={item.label}
                  className="h-full"
                  style={{
                    backgroundColor: `var(${item.colorVar})`,
                    width: `${item.width}%`,
                  }}
                />
              ))}
            </div>
            <div className="space-y-4 text-sm">
              {INCOME_SOURCES.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="size-3 rounded-full"
                      style={{ backgroundColor: `var(${item.colorVar})` }}
                    />
                    <span className="text-muted-foreground">{item.label}</span>
                  </div>
                  <span className="font-medium">{item.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex items-center gap-3 bg-muted text-sm">
            <CreditCard className="mt-0.5 size-5 text-muted-foreground" />
            <div className="text-muted-foreground">
              <div className="mb-1 font-medium text-foreground">
                Passive income streams growing steadily.
              </div>
              Automate your rental collection for better efficiency.
            </div>
          </CardFooter>
        </Card>

        {/* Monthly Expenses */}
        <Card className="flex flex-col gap-6 py-6 xl:col-span-2">
          <CardHeader className="px-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-base font-semibold">Monthly Expenses</div>
                <div className="text-sm text-muted-foreground">Last 6 months</div>
              </div>
              <Button variant="outline" size="sm" className="h-8 px-3">
                View Report
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-6">
            <div className="h-[220px] w-full lg:h-[320px]">
              <ResponsiveContainer>
                <BarChart data={EXPENSES_SERIES}>
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                  />
                  <Tooltip content={<ExpensesTooltip />} cursor={{ fill: "var(--muted)" }} />
                  <Bar
                    dataKey="value"
                    radius={[10, 10, 10, 10]}
                    fill="var(--chart-1)"
                    maxBarSize={60}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium">
              Trending up by 5.2% this month <TrendingUp className="size-4 text-green-600" />
            </div>
            <div className="text-muted-foreground">Showing data from the last 6 months</div>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Summary */}
        <Card className="flex flex-col gap-6 py-6">
          <CardHeader className="px-6">
            <div className="text-base font-semibold">Summary</div>
            <div className="text-sm text-muted-foreground">Data from 1-12 Apr, 2024</div>
            <div className="justify-self-end">
              <Button variant="outline" size="icon">
                <ArrowUpRight className="size-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-6">
            <div className="mx-auto h-[250px] max-w-md">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={SUMMARY_DATA}
                    dataKey="value"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={2}
                  >
                    {SUMMARY_DATA.map((entry) => (
                      <Cell key={entry.name} fill={`var(${entry.colorVar})`} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="-mt-32 text-center">
                <div className="text-3xl font-bold">$1.125</div>
                <div className="text-xs text-muted-foreground">Average per channel</div>
              </div>
            </div>
            <div className="grid gap-2 text-sm md:grid-cols-2">
              {SPENDING_BREAKDOWN.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-md bg-muted px-4 py-3"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="size-3 rounded-full"
                      style={{ backgroundColor: `var(${item.colorVar})` }}
                    />
                    <span className="text-muted-foreground">{item.label}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transactions */}
        <Card className="flex flex-col gap-6 py-6 lg:col-span-2">
          <CardHeader className="flex items-start justify-between px-6">
            <div className="text-base font-semibold">Transactions</div>
            <Button variant="outline" size="sm" className="h-8 px-3">
              View All
            </Button>
          </CardHeader>
          <CardContent className="px-6">
            <div className="relative w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[160px]">Transaction</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TRANSACTIONS.map((tx) => (
                    <TableRow key={`${tx.customer}-${tx.date}`}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8 md:size-10">
                            <AvatarFallback className={`${tx.avatar.className} text-white`}>
                              {tx.avatar.icon && ICON_MAP[tx.avatar.icon]}
                              {!tx.avatar.icon && tx.avatar.fallback}
                            </AvatarFallback>
                          </Avatar>
                          {tx.customer}
                        </div>
                      </TableCell>
                      <TableCell>{tx.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="px-3">
                          {tx.type}
                        </Badge>
                      </TableCell>
                      <TableCell className={`text-right ${tx.positive ? "text-emerald-600" : "text-red-600"}`}>
                        {tx.positive ? "+" : "-"}${Math.abs(tx.amount).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Saving Goal */}
        <Card className="flex flex-col gap-6 py-6">
          <CardHeader className="px-6">
            <div className="text-base font-semibold">Saving Goal</div>
            <div className="text-sm text-muted-foreground">75% Progress</div>
            <div className="justify-self-end">
              <Button variant="outline" size="sm" className="h-8 px-3">
                View Report
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="font-display text-4xl">
              $1,052.98
              <span className="ml-2 text-sm font-normal text-muted-foreground">of $1,200</span>
            </div>
            <Progress value={75} colorClassName="bg-green-500" className="h-3 bg-primary/20" />
          </CardContent>
        </Card>

        {/* Wallet cards */}
        <Card className="flex flex-col gap-6 py-6">
          <CardHeader className="px-6">
            <div className="text-base font-semibold">My Wallet</div>
            <div className="text-sm text-muted-foreground">A total of 4 cards are listed</div>
            <div className="justify-self-end">
              <Button variant="outline" size="sm" className="h-8 px-3">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
                Add New
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              {WALLET_CARDS.map((card) => (
                <div
                  key={card.maskedNumber}
                  className="relative h-48 overflow-hidden rounded-lg p-6 text-white"
                  style={{ backgroundImage: card.gradient }}
                >
                  <div className="absolute inset-0 opacity-25" style={card.accent} />
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div className="space-y-1">
                      <div className="font-medium">{card.title}</div>
                      <div className="font-mono text-lg tracking-wider">{card.maskedNumber}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{card.balance}</div>
                      <CreditCard className="size-10 opacity-80" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

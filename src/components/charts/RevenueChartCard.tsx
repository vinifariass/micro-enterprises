"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip as ReTooltip, XAxis, YAxis } from "recharts";

type Point = Record<string, string | number> & { date: string };

export type RevenueChartCardProps = {
  data: Point[];
  xKey?: keyof Point; // default 'date'
  yKeyDesktop?: keyof Point; // default 'desktop'
  yKeyMobile?: keyof Point; // default 'mobile'
};

export function RevenueChartCard({ data, xKey = "date", yKeyDesktop = "desktop", yKeyMobile = "mobile" }: RevenueChartCardProps) {
  const [segment, setSegment] = React.useState<"desktop" | "mobile">("desktop");
  const totalDesktop = data.reduce((acc, d) => acc + (Number(d[yKeyDesktop]) || 0), 0);
  const totalMobile = data.reduce((acc, d) => acc + (Number(d[yKeyMobile]) || 0), 0);

  return (
    <Card>
      <CardHeader className="flex items-start justify-between p-4 pb-0">
        <div>
          <div className="text-base font-semibold">Revenue Chart</div>
          <div className="text-sm text-muted-foreground">Last 28 days</div>
        </div>
        <div className="grid grid-cols-2 gap-1 rounded-md border p-1 text-sm">
          <button className={`rounded px-2 py-1 ${segment === "desktop" ? "bg-gray-900 text-white" : "text-gray-700"}`} onClick={() => setSegment("desktop")}>
            Desktop <span className="ml-1 opacity-70">{totalDesktop.toLocaleString("pt-BR")}</span>
          </button>
          <button className={`rounded px-2 py-1 ${segment === "mobile" ? "bg-gray-900 text-white" : "text-gray-700"}`} onClick={() => setSegment("mobile")}>
            Mobile <span className="ml-1 opacity-70">{totalMobile.toLocaleString("pt-BR")}</span>
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div data-chart="revenue-chart" className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ left: 8, right: 8 }}>
              <CartesianGrid vertical={true} horizontal={false} stroke="hsl(var(--border))" strokeDasharray="3 3" />
              <XAxis dataKey={xKey as string} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} tickMargin={8} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} tickMargin={8} axisLine={false} tickLine={false} />
              <ReTooltip cursor={{ fill: "rgba(0,0,0,0.04)" }} />
              <Bar
                dataKey={(segment === "desktop" ? yKeyDesktop : yKeyMobile) as string}
                radius={[4, 4, 0, 0]}
                fill={segment === "desktop" ? "var(--color-desktop)" : "var(--color-mobile)"}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default RevenueChartCard;

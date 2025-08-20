"use client";

import * as React from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Bell,
  Calendar,
  Download,
  FolderUp,
  PanelLeft,
  Search,
  Settings,
  Sun,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import RevenueChartCard from "@/components/charts/RevenueChartCard";

// Sample data for 49 days from Apr 3 to May 20
const data = [
  { date: "Apr 03", desktop: 340, mobile: 310 },
  { date: "Apr 04", desktop: 280, mobile: 300 },
  { date: "Apr 05", desktop: 360, mobile: 330 },
  { date: "Apr 06", desktop: 420, mobile: 370 },
  { date: "Apr 07", desktop: 400, mobile: 360 },
  { date: "Apr 08", desktop: 380, mobile: 350 },
  { date: "Apr 09", desktop: 410, mobile: 365 },
  { date: "Apr 10", desktop: 395, mobile: 355 },
  { date: "Apr 11", desktop: 360, mobile: 330 },
  { date: "Apr 12", desktop: 380, mobile: 340 },
  { date: "Apr 13", desktop: 420, mobile: 380 },
  { date: "Apr 14", desktop: 460, mobile: 410 },
  { date: "Apr 15", desktop: 480, mobile: 430 },
  { date: "Apr 16", desktop: 500, mobile: 450 },
  { date: "Apr 17", desktop: 520, mobile: 470 },
  { date: "Apr 18", desktop: 480, mobile: 440 },
  { date: "Apr 19", desktop: 460, mobile: 420 },
  { date: "Apr 20", desktop: 490, mobile: 430 },
  { date: "Apr 21", desktop: 510, mobile: 460 },
  { date: "Apr 22", desktop: 530, mobile: 470 },
  { date: "Apr 23", desktop: 550, mobile: 490 },
  { date: "Apr 24", desktop: 520, mobile: 460 },
  { date: "Apr 25", desktop: 500, mobile: 450 },
  { date: "Apr 26", desktop: 520, mobile: 470 },
  { date: "Apr 27", desktop: 540, mobile: 490 },
  { date: "Apr 28", desktop: 560, mobile: 510 },
  { date: "Apr 29", desktop: 580, mobile: 520 },
  { date: "Apr 30", desktop: 600, mobile: 540 },
  { date: "May 01", desktop: 620, mobile: 560 },
  { date: "May 02", desktop: 640, mobile: 580 },
  { date: "May 03", desktop: 660, mobile: 600 },
  { date: "May 04", desktop: 680, mobile: 620 },
  { date: "May 05", desktop: 700, mobile: 640 },
  { date: "May 06", desktop: 720, mobile: 660 },
  { date: "May 07", desktop: 740, mobile: 680 },
  { date: "May 08", desktop: 760, mobile: 700 },
  { date: "May 09", desktop: 720, mobile: 660 },
  { date: "May 10", desktop: 700, mobile: 640 },
  { date: "May 11", desktop: 680, mobile: 620 },
  { date: "May 12", desktop: 660, mobile: 600 },
  { date: "May 13", desktop: 640, mobile: 580 },
  { date: "May 14", desktop: 620, mobile: 560 },
  { date: "May 15", desktop: 600, mobile: 540 },
  { date: "May 16", desktop: 580, mobile: 520 },
  { date: "May 17", desktop: 560, mobile: 500 },
  { date: "May 18", desktop: 540, mobile: 480 },
  { date: "May 19", desktop: 520, mobile: 460 },
  { date: "May 20", desktop: 500, mobile: 440 },
];

function KpiCard({ label, value, delta, trend }: { label: string; value: string; delta: string; trend: "up" | "down" }) {
  const up = trend === "up";
  return (
    <Card className="flex flex-col gap-6 py-6">
      <CardHeader className="space-y-1">
        <div className="text-muted-foreground text-sm">{label}</div>
        <div className="font-display text-2xl lg:text-3xl">{value}</div>
        <div className="flex items-center text-xs">
          {up ? (
            <ArrowUp className="mr-1 size-3 text-green-500" />
          ) : (
            <ArrowDown className="mr-1 size-3 text-red-500" />
          )}
          <span className={`font-medium ${up ? "text-green-500" : "text-red-500"}`}>{delta}</span>
          <span className="text-muted-foreground ml-1">Compare from last month</span>
        </div>
      </CardHeader>
    </Card>
  );
}

export default function SalesDashboardView() {
  const [segment, setSegment] = React.useState<"desktop" | "mobile">("desktop");
  const totalDesktop = 13746;
  const totalMobile = 13580;

  return (
    <div className="min-h-svh w-full bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 h-14 border-b bg-white/70 backdrop-blur flex items-center px-4">
        <Button variant="ghost" size="icon" className="mr-2">
          <PanelLeft className="size-5" />
        </Button>
        <Separator orientation="vertical" className="mx-2 hidden sm:block" />
        <div className="relative hidden md:block w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input className="pl-9 pr-12 h-9" placeholder="Search..." />
          <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500">
            ⌘K
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="size-5" />
            <span className="absolute right-1 top-1 block h-2 w-2 rounded-full bg-red-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Sun className="size-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="size-5" />
          </Button>
          <Separator orientation="vertical" className="mx-2 hidden sm:block" />
          <Avatar className="size-8">
            <AvatarImage src="/vercel.svg" alt="User" />
            <AvatarFallback>VF</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Title + Actions */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Sales Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 size-4" /> 20 Jul 2025 - 16 Aug 2025
            </Button>
            <Button>
              <Download className="mr-2 size-4" /> Download
            </Button>
          </div>
        </div>

        {/* First Row */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
          {/* Revenue Chart Card (4 cols) */}
          <div className="lg:col-span-4">
            <RevenueChartCard data={data} />
          </div>

          {/* Stats Cards (4 cols) */}
          <div className="grid gap-4 lg:col-span-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard label="Total Balance" value="$103,045" delta="3.6%" trend="up" />
            <KpiCard label="Total Income" value="$78,000" delta="2.5%" trend="up" />
            <KpiCard label="Total Expense" value="$15,010" delta="6.0%" trend="down" />
            <KpiCard label="Total Sales Tax" value="$9,090" delta="5.0%" trend="up" />
          </div>
        </div>

        {/* Second Row */}
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Best Selling Product */}
          <Card className="p-4">
            <div className="pb-2">
              <div className="text-base font-semibold">Best Selling Product</div>
              <div className="text-sm text-gray-500">Top-Selling Products at a Glance</div>
            </div>
            <div className="divide-y">
              {[
                { name: "Red Sneakers", sold: 402, img: "/images/streetwear/vans-old-skool.jpg" },
                { name: "Sports Shoes", sold: 316, img: "/images/streetwear/nb-480-br.jpg" },
                { name: "Black T-Shirt", sold: 274, img: "/images/streetwear/tee-worldwide.jpg" },
                { name: "Jeans", sold: 195, img: "/images/streetwear/nb-480-bw.jpg" },
                { name: "Red Scarf", sold: 280, img: "/images/streetwear/adidas-grey-gum.jpg" },
                { name: "Kitchen Accessory", sold: 150, img: "/images/streetwear/tee-open-mind.jpg" },
              ].map((p) => (
                <a key={p.name} href="#" className="flex items-center gap-3 py-3 hover:bg-gray-50">
                  <Image src={p.img} alt={p.name} width={40} height={40} className="rounded object-cover" />
                  <div className="flex-1">
                    <div className="font-medium">{p.name}</div>
                  </div>
                  <div className="text-xs font-medium text-green-600">{p.sold} items sold</div>
                </a>
              ))}
            </div>
          </Card>

          {/* Track Order Status (span 2 cols) */}
          <Card className="p-4 lg:col-span-2">
            <div className="flex items-start justify-between pb-2">
              <div>
                <div className="text-base font-semibold">Track Order Status</div>
                <div className="text-sm text-gray-500">Analyze growth and changes in visitor patterns</div>
              </div>
              <Button variant="outline">
                <FolderUp className="mr-2 size-4" /> Export
              </Button>
            </div>

            {/* Status Summary */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="text-2xl font-semibold">43</div>
                <div className="text-sm text-gray-500">New Order</div>
                <div className="mt-1 text-xs font-medium text-green-600">+0.5%</div>
                <div className="mt-2"><Progress value={62} colorClassName="bg-blue-600" /></div>
              </div>
              <div>
                <div className="text-2xl font-semibold">12</div>
                <div className="text-sm text-gray-500">On Progress</div>
                <div className="text-xs font-medium text-red-600 mt-1">-0.3%</div>
                <div className="mt-2"><Progress value={38} colorClassName="bg-cyan-700" /></div>
              </div>
              <div>
                <div className="text-2xl font-semibold">40</div>
                <div className="text-sm text-gray-500">Completed</div>
                <div className="text-xs font-medium text-green-600 mt-1">+0.5%</div>
                <div className="mt-2"><Progress value={85} colorClassName="bg-green-600" /></div>
              </div>
              <div>
                <div className="text-2xl font-semibold">2</div>
                <div className="text-sm text-gray-500">Return</div>
                <div className="text-xs font-medium text-red-600 mt-1">-0.5%</div>
                <div className="mt-2"><Progress value={12} colorClassName="bg-orange-500" /></div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2">
                <Input placeholder="Filter orders..." className="max-w-xs" />
                <div className="ml-auto relative">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Columns</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>ID</DropdownMenuItem>
                      <DropdownMenuItem>Customer Name</DropdownMenuItem>
                      <DropdownMenuItem>Qty Items</DropdownMenuItem>
                      <DropdownMenuItem>Amount</DropdownMenuItem>
                      <DropdownMenuItem>Payment Method</DropdownMenuItem>
                      <DropdownMenuItem>Status</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="rounded-lg border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Customer Name</TableHead>
                      <TableHead>Qty Items</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { id: "#1001", name: "John Doe", qty: 3, amount: 129.9, method: "Credit Card", status: "new order", color: "bg-blue-100 text-blue-700 border-blue-300" },
                      { id: "#1002", name: "Jane Smith", qty: 2, amount: 89.5, method: "Pix", status: "in progress", color: "bg-orange-100 text-orange-700 border-orange-300" },
                      { id: "#1003", name: "Mike Johnson", qty: 1, amount: 49.9, method: "Boleto", status: "on hold", color: "bg-orange-100 text-orange-700 border-orange-300" },
                      { id: "#1004", name: "Emily Davis", qty: 5, amount: 299.0, method: "Credit Card", status: "completed", color: "bg-green-100 text-green-700 border-green-300" },
                      { id: "#1005", name: "Chris Lee", qty: 4, amount: 199.0, method: "Debit", status: "new order", color: "bg-blue-100 text-blue-700 border-blue-300" },
                      { id: "#1006", name: "Sara Wilson", qty: 2, amount: 120.0, method: "Pix", status: "completed", color: "bg-green-100 text-green-700 border-green-300" },
                    ].map((o) => (
                      <TableRow key={o.id}>
                        <TableCell className="font-medium">{o.id}</TableCell>
                        <TableCell>{o.name}</TableCell>
                        <TableCell>{o.qty}</TableCell>
                        <TableCell>${o.amount.toFixed(2)}</TableCell>
                        <TableCell>{o.method}</TableCell>
                        <TableCell>
                          <Badge className={`capitalize ${o.color}`}>{o.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-end gap-2">
                <Button variant="outline" disabled>Previous</Button>
                <Button variant="outline">Next</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

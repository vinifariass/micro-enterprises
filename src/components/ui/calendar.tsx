"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: "size-8 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-100",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-xs",
        row: "flex w-full mt-2",
        cell: "relative text-center text-sm",
        day: cn(
          "size-9 rounded-full border border-transparent text-sm transition-all hover:border-slate-300 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400",
          "aria-selected:bg-slate-900 aria-selected:text-white"
        ),
        day_selected: "bg-slate-900 text-white hover:bg-slate-900",
        day_today: "border border-slate-300 bg-slate-100 text-slate-900",
        day_outside: "text-slate-300 opacity-50",
        day_disabled: "text-slate-300 opacity-50",
        range_start: "bg-slate-900 text-white",
        range_end: "bg-slate-900 text-white",
        range_middle: "bg-slate-200 text-slate-900",
      }}
      {...props}
    />
  );
}

"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import * as React from "react";

import { Calendar } from "@/components/ui/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";

import { cn } from "@/lib/neoBrutalism";
import Button from "./button/Button";

export default function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="noShadow"
          className={cn(
            "w-[280px] justify-start text-left font-base",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-text" />
          {date ? (
            format(date, "PPP")
          ) : (
            <span className="text-text">Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto !border-0 p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

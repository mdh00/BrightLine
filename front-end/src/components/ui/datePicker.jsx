"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerDemo({ onDateChange }) {
    const [date, setDate] = React.useState(new Date());
    const [currentMonth, setCurrentMonth] = React.useState(new Date());

    const handleDateSelect = (newDate) => {
      setDate(newDate);
      setCurrentMonth(newDate);
      if (onDateChange) {
        onDateChange(newDate);
      }
    };
    const formattedDate = date ? format(date, "PPP") : "Pick a date";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formattedDate}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          month ={currentMonth}
          onMonthChange={setCurrentMonth}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
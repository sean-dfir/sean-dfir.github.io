"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import type { Designer } from "@/lib/mock-data";

export function BookingForm({ designer }: { designer: Designer }) {
  const [hours, setHours] = useState(4);

  const subtotal = designer.pricePerHour * hours;
  const fee = Math.round(subtotal * 0.1);
  const total = subtotal + fee;

  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="event-date">Event date</label>
        <Input id="event-date" name="eventDate" type="date" required />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="hours">Estimated hours</label>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setHours(Math.max(1, hours - 1))}
          >
            −
          </Button>
          <span className="w-8 text-center font-medium">{hours}</span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setHours(Math.min(24, hours + 1))}
          >
            +
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="event-type">Event type</label>
        <select
          id="event-type"
          name="eventType"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          required
        >
          <option value="">Select an event type</option>
          <option>Wedding</option>
          <option>Corporate event</option>
          <option>Birthday party</option>
          <option>Baby shower</option>
          <option>Anniversary</option>
          <option>Other</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="notes">Notes for the designer</label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Tell the designer about your event, color palette, flower preferences..."
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
        />
      </div>

      {/* Price breakdown */}
      <Card>
        <CardContent className="p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">${designer.pricePerHour} × {hours} hrs</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service fee (10%)</span>
            <span>${fee}</span>
          </div>
          <div className="flex justify-between font-semibold border-t pt-2 mt-2">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full bg-rose-700 hover:bg-rose-800 text-white">
        Request booking — ${total}
      </Button>
    </form>
  );
}

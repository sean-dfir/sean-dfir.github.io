import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MOCK_REQUESTS = [
  {
    id: "r1",
    clientName: "Priya S.",
    eventDate: "2026-05-20",
    eventType: "Wedding",
    hours: 6,
    total: 627,
    status: "pending",
    notes: "Looking for romantic garden-style centerpieces in blush and cream tones.",
  },
  {
    id: "r2",
    clientName: "Alex T.",
    eventDate: "2026-06-10",
    eventType: "Baby shower",
    hours: 3,
    total: 313,
    status: "confirmed",
    notes: "Soft pastel arrangements, yellow and mint.",
  },
];

const STATS = [
  { label: "This month", value: "$940", sub: "earnings" },
  { label: "Bookings", value: "2", sub: "active" },
  { label: "Rating", value: "4.9", sub: "avg ⭐" },
];

export default function DesignerDashboard() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Designer dashboard</h1>
        <Link href="/designers/1" className={cn(buttonVariants({ variant: "outline" }))}>
          View my profile
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {STATS.map(({ label, value, sub }) => (
          <Card key={label}>
            <CardContent className="p-5 text-center">
              <p className="text-3xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{label} {sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Booking requests */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Booking requests</h2>
        <div className="space-y-4">
          {MOCK_REQUESTS.map((req) => (
            <Card key={req.id}>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">{req.clientName}</p>
                    <p className="text-sm text-muted-foreground">{req.eventType} · {req.eventDate} · {req.hours} hrs</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">${req.total}</span>
                    <Badge variant={req.status === "confirmed" ? "default" : "secondary"}>
                      {req.status}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground border-l-2 pl-3 italic">&ldquo;{req.notes}&rdquo;</p>
                {req.status === "pending" && (
                  <div className="flex gap-2">
                    <button className={cn(buttonVariants({ size: "sm" }), "bg-rose-700 hover:bg-rose-800 text-white")}>
                      Accept
                    </button>
                    <button className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
                      Decline
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Availability (placeholder) */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Availability</h2>
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground text-sm">
            <p>Calendar management coming soon.</p>
            <p className="mt-1">You&apos;ll be able to block dates and set recurring availability here.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

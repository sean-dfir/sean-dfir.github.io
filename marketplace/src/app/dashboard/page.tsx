import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const MOCK_BOOKINGS = [
  {
    id: "b1",
    designerName: "Aria Nguyen",
    designerAvatar: "https://api.dicebear.com/9.x/personas/svg?seed=aria",
    eventDate: "2026-05-15",
    eventType: "Wedding",
    status: "confirmed",
    total: 418,
  },
  {
    id: "b2",
    designerName: "Marcus Bell",
    designerAvatar: "https://api.dicebear.com/9.x/personas/svg?seed=marcus",
    eventDate: "2026-06-02",
    eventType: "Corporate event",
    status: "pending",
    total: 638,
  },
];

const STATUS_STYLES: Record<string, string> = {
  confirmed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-gray-100 text-gray-800",
};

export default function ClientDashboard() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-8">My bookings</h1>

      {MOCK_BOOKINGS.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p>You don&apos;t have any bookings yet.</p>
          <Link href="/designers" className={cn(buttonVariants(), "mt-4")}>
            Find a designer
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {MOCK_BOOKINGS.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={booking.designerAvatar} alt={booking.designerName} />
                    <AvatarFallback>{booking.designerName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{booking.designerName}</p>
                    <p className="text-sm text-muted-foreground">{booking.eventType} · {booking.eventDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${STATUS_STYLES[booking.status]}`}>
                    {booking.status}
                  </span>
                  <span className="font-semibold">${booking.total}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

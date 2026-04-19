import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getDesignerById } from "@/lib/mock-data";
import { BookingForm } from "@/components/booking-form";

export default async function BookPage({ params }: { params: Promise<{ designerId: string }> }) {
  const { designerId } = await params;
  const designer = getDesignerById(designerId);

  if (!designer || !designer.available) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link href={`/designers/${designer.id}`} className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-block">
        ← Back to profile
      </Link>

      <h1 className="text-2xl font-bold mb-8">Book {designer.name}</h1>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Booking form */}
        <div className="lg:col-span-3">
          <BookingForm designer={designer} />
        </div>

        {/* Summary */}
        <aside className="lg:col-span-2">
          <Card className="sticky top-20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Booking summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={designer.avatarUrl} alt={designer.name} />
                  <AvatarFallback>{designer.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{designer.name}</p>
                  <p className="text-xs text-muted-foreground">{designer.location}</p>
                </div>
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rate</span>
                  <span>${designer.pricePerHour}/hr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service fee</span>
                  <span>10%</span>
                </div>
              </div>
              <Separator />
              <p className="text-xs text-muted-foreground">
                You won&apos;t be charged until the designer confirms your booking. Full refund if cancelled 48h+ before the event.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getDesignerById } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default async function DesignerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const designer = getDesignerById(id);

  if (!designer) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-6 flex flex-col items-center text-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={designer.avatarUrl} alt={designer.name} />
                <AvatarFallback className="text-2xl">{designer.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold">{designer.name}</h1>
                <p className="text-sm text-muted-foreground mt-1">{designer.location}</p>
              </div>
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="font-semibold">⭐ {designer.rating}</span>
                  <p className="text-xs text-muted-foreground">{designer.reviewCount} reviews</p>
                </div>
                <div>
                  <span className="font-semibold">{designer.yearsExperience} yrs</span>
                  <p className="text-xs text-muted-foreground">experience</p>
                </div>
              </div>
              <Separator />
              <div className="w-full text-left space-y-1">
                <p className="text-xs text-muted-foreground uppercase font-medium tracking-wide">Starting at</p>
                <p className="text-2xl font-bold">${designer.pricePerHour}<span className="text-base font-normal text-muted-foreground">/hr</span></p>
              </div>
              {designer.available ? (
                <Link
                  href={`/book/${designer.id}`}
                  className={cn(buttonVariants(), "w-full bg-rose-700 hover:bg-rose-800 text-white")}
                >
                  Book {designer.name.split(" ")[0]}
                </Link>
              ) : (
                <span className={cn(buttonVariants(), "w-full opacity-50 pointer-events-none")}>
                  Currently unavailable
                </span>
              )}
            </CardContent>
          </Card>
        </aside>

        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-lg font-semibold mb-3">About</h2>
            <p className="text-muted-foreground leading-relaxed">{designer.bio}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">Specialties</h2>
            <div className="flex flex-wrap gap-2">
              {designer.styles.map((s) => (
                <Badge key={s} variant="secondary">{s}</Badge>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3">Portfolio</h2>
            {designer.portfolioUrls.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {designer.portfolioUrls.map((url, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={url} alt={`Portfolio ${i + 1}`} className="aspect-square rounded-md object-cover" />
                ))}
              </div>
            ) : (
              <div className="rounded-md border border-dashed py-12 text-center text-sm text-muted-foreground">
                Portfolio photos coming soon
              </div>
            )}
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">Reviews</h2>
            <div className="space-y-4">
              {[
                { author: "Jessica M.", date: "March 2025", rating: 5, text: "Absolutely stunning arrangements for our wedding. Every detail was perfect!" },
                { author: "Tom K.", date: "January 2025", rating: 5, text: "Professional, creative, and easy to work with. Would book again in a heartbeat." },
              ].map((review, i) => (
                <Card key={i}>
                  <CardContent className="p-4 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{review.author}</span>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="text-yellow-500 text-sm">{"★".repeat(review.rating)}</div>
                    <p className="text-sm text-muted-foreground">{review.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

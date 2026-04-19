import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DesignerCard } from "@/components/designer-card";
import { FEATURED_DESIGNERS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-rose-50 py-20 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-4xl font-bold tracking-tight text-rose-900 sm:text-5xl">
            Find the perfect floral designer for your event
          </h1>
          <p className="mt-4 text-lg text-rose-700">
            Browse hundreds of talented freelance floral designers available for weddings, corporate events, and more.
          </p>
          <form action="/designers" method="GET" className="mt-8 flex gap-2 max-w-xl mx-auto">
            <Input
              name="q"
              placeholder="Search by city, style, or occasion..."
              className="bg-white"
            />
            <button
              type="submit"
              className={cn(buttonVariants(), "bg-rose-700 hover:bg-rose-800 text-white shrink-0")}
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 border-b">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold text-center mb-10">How BloomPro works</h2>
          <div className="grid gap-8 sm:grid-cols-3 text-center">
            {[
              { step: "1", title: "Browse designers", desc: "Filter by location, style, budget, and availability." },
              { step: "2", title: "Book instantly", desc: "Select a date, share event details, and pay securely." },
              { step: "3", title: "Enjoy your event", desc: "Your designer handles everything — just show up." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-700 font-bold">
                  {step}
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured designers */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">Featured designers</h2>
            <Link href="/designers" className={cn(buttonVariants({ variant: "outline" }))}>
              View all
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_DESIGNERS.map((designer) => (
              <DesignerCard key={designer.id} designer={designer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA for designers */}
      <section className="bg-rose-900 py-16 text-center text-white">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-3xl font-bold">Are you a floral designer?</h2>
          <p className="mt-3 text-rose-200">
            Join BloomPro to reach clients in your area, manage your bookings, and grow your business.
          </p>
          <Link
            href="/auth/signup?role=designer"
            className={cn(buttonVariants(), "mt-6 bg-white text-rose-900 hover:bg-rose-50")}
          >
            Apply as a designer
          </Link>
        </div>
      </section>
    </div>
  );
}

import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DesignerCard } from "@/components/designer-card";
import { FEATURED_DESIGNERS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const STYLE_FILTERS = ["Garden", "Modern", "Boho", "Tropical", "Minimalist", "Wildflower", "Earthy", "Romantic"];

export default async function DesignersPage({ searchParams }: { searchParams: Promise<{ q?: string; style?: string }> }) {
  const { q, style } = await searchParams;

  const filtered = FEATURED_DESIGNERS.filter((d) => {
    const matchesQuery = !q || d.name.toLowerCase().includes(q.toLowerCase()) || d.location.toLowerCase().includes(q.toLowerCase());
    const matchesStyle = !style || d.styles.some((s) => s.toLowerCase() === style.toLowerCase());
    return matchesQuery && matchesStyle;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Browse floral designers</h1>

      {/* Search + filters */}
      <div className="mb-8 space-y-4">
        <form method="GET" className="flex gap-2 max-w-lg">
          <Input name="q" defaultValue={q} placeholder="Search by name or city..." />
          {style && <input type="hidden" name="style" value={style} />}
          <button type="submit" className={cn(buttonVariants())}>Search</button>
        </form>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Style:</span>
          {STYLE_FILTERS.map((s) => (
            <a key={s} href={`/designers?${q ? `q=${q}&` : ""}style=${style === s ? "" : s}`}>
              <Badge
                variant={style === s ? "default" : "outline"}
                className="cursor-pointer hover:bg-secondary"
              >
                {s}
              </Badge>
            </a>
          ))}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">
          <p className="text-lg">No designers found matching your criteria.</p>
          <a href="/designers" className={cn(buttonVariants({ variant: "link" }), "mt-2")}>
            Clear filters
          </a>
        </div>
      ) : (
        <>
          <p className="mb-4 text-sm text-muted-foreground">{filtered.length} designer{filtered.length !== 1 ? "s" : ""} found</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((d) => (
              <DesignerCard key={d.id} designer={d} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { Designer } from "@/lib/mock-data";

export function DesignerCard({ designer }: { designer: Designer }) {
  return (
    <Link href={`/designers/${designer.id}`} className="group block">
      <Card className="h-full transition-shadow group-hover:shadow-md">
        <CardContent className="p-5 flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12 shrink-0">
              <AvatarImage src={designer.avatarUrl} alt={designer.name} />
              <AvatarFallback>{designer.name[0]}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold truncate">{designer.name}</h3>
                {!designer.available && (
                  <span className="text-xs text-muted-foreground shrink-0">(Unavailable)</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{designer.location}</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">{designer.bio}</p>

          <div className="flex flex-wrap gap-1">
            {designer.styles.map((s) => (
              <Badge key={s} variant="secondary" className="text-xs">
                {s}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm border-t pt-3 mt-auto">
            <span className="font-medium">${designer.pricePerHour}/hr</span>
            <span className="text-muted-foreground">
              ⭐ {designer.rating} ({designer.reviewCount})
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

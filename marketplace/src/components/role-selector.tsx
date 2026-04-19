"use client";

import { useState } from "react";

type Role = "client" | "designer";

export function RoleSelector({ defaultRole }: { defaultRole: Role }) {
  const [role, setRole] = useState<Role>(defaultRole);

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">I am a...</p>
      <div className="grid grid-cols-2 gap-3">
        {(["client", "designer"] as Role[]).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`rounded-lg border-2 p-4 text-left transition-colors ${
              role === r
                ? "border-rose-700 bg-rose-50 text-rose-900"
                : "border-border hover:border-rose-200"
            }`}
          >
            <p className="font-semibold capitalize">{r}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {r === "client" ? "Looking to book a designer" : "Offering floral design services"}
            </p>
          </button>
        ))}
      </div>
      <input type="hidden" name="role" value={role} />
    </div>
  );
}

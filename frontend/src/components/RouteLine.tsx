import { Car } from "lucide-react";

export function RouteLine({
  fromTime,
  fromLabel,
  toTime,
  toLabel,
  matched = false,
}: {
  fromTime: string;
  fromLabel: string;
  toTime: string;
  toLabel: string;
  matched?: boolean;
}) {
  return (
    <div className="relative flex items-center justify-between py-3">
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-surface-high rounded-full" />
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 h-1 rounded-full ${
          matched ? "bg-gradient-primary w-2/3" : "bg-primary w-1/3"
        }`}
      />
      <div className="relative z-10 flex flex-col items-start bg-surface-lowest pr-4">
        <span className="text-base font-bold tracking-tight tabular-nums">{fromTime}</span>
        <span className="text-xs text-muted-foreground">{fromLabel}</span>
      </div>
      <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-surface-lowest">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-ambient">
          <Car className="h-4 w-4" />
        </div>
      </div>
      <div className="relative z-10 flex flex-col items-end bg-surface-lowest pl-4">
        <span className="text-base font-bold tracking-tight tabular-nums">{toTime}</span>
        <span className="text-xs text-muted-foreground">{toLabel}</span>
      </div>
    </div>
  );
}

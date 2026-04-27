import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { RideCard } from "@/components/RideCard";
import { RIDES } from "@/lib/mockData";
import { Sun, Sunset, Moon, CloudSun, ShieldCheck } from "lucide-react";

const searchSchema = z.object({
  from: z.string().optional().default("Delhi"),
  to: z.string().optional().default("Jaipur"),
  date: z.string().optional().default(""),
  seats: z.coerce.number().optional().default(1),
});

export const Route = createFileRoute("/find-rides")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Find Intercity Rides — iRide" },
      {
        name: "description",
        content:
          "Browse premium intercity drivers with reverse-leg matched returns. Filter by time, price and seats.",
      },
      { property: "og:title", content: "Find Rides — iRide" },
      {
        property: "og:description",
        content: "Reverse-leg matched intercity rides, filtered by time and price.",
      },
    ],
  }),
  component: FindRides,
});

const TIME_BANDS = [
  { id: "morning", label: "Morning", icon: Sun },
  { id: "afternoon", label: "Afternoon", icon: CloudSun },
  { id: "evening", label: "Evening", icon: Sunset },
  { id: "night", label: "Night", icon: Moon },
] as const;

type Sort = "cheapest" | "earliest" | "fastest";

function FindRides() {
  const { from, to, date, seats } = Route.useSearch();
  const [sort, setSort] = useState<Sort>("cheapest");
  const [selectedSeats, setSelectedSeats] = useState<number>(seats || 1);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [matchedOnly, setMatchedOnly] = useState(false);
  const [bands, setBands] = useState<Set<string>>(new Set());

  function toggleBand(id: string) {
    const next = new Set(bands);
    next.has(id) ? next.delete(id) : next.add(id);
    setBands(next);
  }

  const rides = useMemo(() => {
    let list = RIDES.filter((r) => r.seatsLeft >= selectedSeats);
    if (matchedOnly) list = list.filter((r) => r.hasReturnMatch);
    if (verifiedOnly) list = list.filter((r) => r.rating >= 4.7);
    if (bands.size > 0) {
      list = list.filter((r) => bands.has(bandOf(r.departTime)));
    }
    if (sort === "cheapest") list.sort((a, b) => a.pricePerSeat - b.pricePerSeat);
    if (sort === "earliest") list.sort((a, b) => parseTime(a.departTime) - parseTime(b.departTime));
    if (sort === "fastest")
      list.sort(
        (a, b) =>
          parseTime(a.arriveTime) - parseTime(a.departTime) -
          (parseTime(b.arriveTime) - parseTime(b.departTime)),
      );
    return list;
  }, [selectedSeats, matchedOnly, verifiedOnly, bands, sort]);

  const dateLabel = date
    ? new Date(date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })
    : "Tue, 24 Oct";

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 md:py-14">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[11px] uppercase tracking-widest font-black text-secondary">
            Available journeys
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-black tracking-tighter mt-2">
            {from} <span className="text-muted-foreground font-normal">to</span> {to}
          </h1>
          <p className="text-muted-foreground mt-2">
            Showing {rides.length} premium intercity {rides.length === 1 ? "ride" : "rides"} for{" "}
            {dateLabel}
          </p>
        </div>
        <div className="flex items-center gap-1 p-1.5 bg-surface-low rounded-xl">
          {(["cheapest", "earliest", "fastest"] as Sort[]).map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                sort === s
                  ? "bg-surface-lowest shadow-ambient text-primary"
                  : "text-secondary hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Filters */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-surface-low rounded-2xl p-6 space-y-8">
            <FilterBlock title="Departure time">
              <div className="grid grid-cols-2 gap-2.5">
                {TIME_BANDS.map(({ id, label, icon: Icon }) => {
                  const active = bands.has(id);
                  return (
                    <button
                      key={id}
                      onClick={() => toggleBand(id)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all ${
                        active
                          ? "bg-gradient-primary text-primary-foreground shadow-ambient"
                          : "bg-surface-lowest text-secondary hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-5 w-5 mb-1.5" />
                      <span className="text-[10px] font-black uppercase tracking-wider">
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </FilterBlock>

            <FilterBlock title="Seats required">
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    onClick={() => setSelectedSeats(n)}
                    className={`h-10 w-10 rounded-full text-sm font-black transition-all ${
                      selectedSeats === n
                        ? "bg-gradient-primary text-primary-foreground shadow-ambient"
                        : "bg-surface-lowest text-foreground hover:bg-surface-high"
                    }`}
                  >
                    {n}
                    {n === 4 && "+"}
                  </button>
                ))}
              </div>
            </FilterBlock>

            <FilterBlock title="Match quality">
              <div className="space-y-3">
                <Toggle
                  label="Reverse leg matched only"
                  checked={matchedOnly}
                  onChange={setMatchedOnly}
                />
                <Toggle
                  label="Verified drivers (4.7+)"
                  checked={verifiedOnly}
                  onChange={setVerifiedOnly}
                />
              </div>
            </FilterBlock>
          </div>

          <div className="bg-gradient-primary rounded-2xl p-6 text-primary-foreground space-y-3">
            <ShieldCheck className="h-6 w-6" />
            <h3 className="font-display text-lg font-bold tracking-tight">
              Every driver, verified.
            </h3>
            <p className="text-sm text-primary-foreground/85 leading-relaxed">
              Government ID, license and vehicle papers checked before any ride goes live.
            </p>
          </div>
        </aside>

        {/* Results */}
        <div className="lg:col-span-9 space-y-5">
          {rides.length === 0 ? (
            <div className="bg-surface-lowest rounded-2xl p-12 text-center shadow-ambient">
              <p className="font-display text-xl font-bold">No rides match those filters.</p>
              <p className="text-muted-foreground mt-2 text-sm">
                Loosen your time band or reduce the seat count.
              </p>
            </div>
          ) : (
            rides.map((r) => <RideCard key={r.id} ride={r} />)
          )}
        </div>
      </div>
    </main>
  );
}

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[11px] font-black uppercase tracking-widest text-foreground mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer group">
      <span className="text-sm font-medium text-secondary group-hover:text-foreground transition-colors">
        {label}
      </span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors shrink-0 ${
          checked ? "bg-gradient-primary" : "bg-surface-high"
        }`}
        aria-pressed={checked}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-surface-lowest shadow-ambient transition-transform ${
            checked ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </label>
  );
}

function parseTime(t: string): number {
  // "08:00 AM" -> minutes
  const [hm, period] = t.split(" ");
  const [h, m] = hm.split(":").map(Number);
  const hour = (h % 12) + (period === "PM" ? 12 : 0);
  return hour * 60 + m;
}

function bandOf(t: string): string {
  const m = parseTime(t);
  if (m < 12 * 60) return "morning";
  if (m < 16 * 60) return "afternoon";
  if (m < 20 * 60) return "evening";
  return "night";
}

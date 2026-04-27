import { useState, useRef, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, ChevronDown, MapPin, Search, Sparkles, Users, X } from "lucide-react";
import heroHighway from "@/assets/hero-highway.jpg";
import { POPULAR_ROUTES } from "@/lib/mockData";

export const Route = createFileRoute("/")({
  component: Index,
});

const INDIAN_CITIES = [
  "Agra", "Ahmedabad", "Ajmer", "Allahabad", "Amritsar", "Aurangabad",
  "Bangalore", "Bhopal", "Bhubaneswar", "Chandigarh", "Chennai",
  "Coimbatore", "Dehradun", "Delhi", "Faridabad", "Goa", "Gurgaon",
  "Guwahati", "Gwalior", "Hyderabad", "Indore", "Jaipur", "Jalandhar",
  "Jammu", "Jodhpur", "Kanpur", "Kochi", "Kolkata", "Lucknow",
  "Ludhiana", "Madurai", "Mangalore", "Mumbai", "Mysore", "Nagpur",
  "Nashik", "Noida", "Patna", "Pune", "Raipur", "Rajkot", "Ranchi",
  "Shimla", "Surat", "Srinagar", "Thiruvananthapuram", "Udaipur",
  "Vadodara", "Varanasi", "Vijayawada", "Visakhapatnam",
];

function CityDropdown({
  value,
  onChange,
  placeholder,
  icon,
  label,
}: {
  value: string;
  onChange: (city: string) => void;
  placeholder: string;
  icon: React.ReactNode;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = INDIAN_CITIES.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (open && searchRef.current) {
      searchRef.current.focus();
    }
  }, [open]);

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => { setOpen(!open); setSearch(""); }}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-low transition-colors text-left overflow-hidden"
      >
        <div className="h-9 w-9 rounded-lg bg-surface-low flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0 overflow-hidden">
          <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">{label}</p>
          <p className={`font-semibold text-base truncate ${value ? "text-foreground" : "text-muted-foreground"}`}>
            {value || placeholder}
          </p>
        </div>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-surface-lowest rounded-2xl shadow-lift z-50 overflow-hidden border border-surface-high">
          <div className="p-3 border-b border-surface-high">
            <div className="flex items-center gap-2 bg-surface-low rounded-xl px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                ref={searchRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search city..."
                className="bg-transparent outline-none text-sm font-medium w-full placeholder:text-muted-foreground"
              />
              {search && (
                <button onClick={() => setSearch("")} type="button">
                  <X className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>
          <div className="max-h-56 overflow-y-auto py-2">
            {filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">No cities found</p>
            ) : (
              filtered.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => { onChange(city); setOpen(false); setSearch(""); }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-surface-low transition-colors ${
                    value === city ? "text-primary font-bold bg-surface-low" : "text-foreground"
                  }`}
                >
                  {city}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Index() {
  const [from, setFrom] = useState("Delhi");
  const [to, setTo] = useState("Jaipur");
  const [date, setDate] = useState("");
  const [seats, setSeats] = useState(1);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    window.location.href = `find-rides?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}&seats=${seats}`;
  }

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-hero" />
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 lg:pt-24 lg:pb-32 flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

          {/* Left Column */}
          <div className="flex-1 space-y-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-tertiary-container text-on-tertiary-container px-3 py-1.5 text-[11px] font-black uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              Reverse-leg matching · Live in 18 cities
            </span>

            <h1 className="font-display text-5xl md:text-6xl font-black tracking-tighter leading-[1.02]">
              The empty return seat,
              <span className="block text-primary">finally has a passenger.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              iRide pairs your A → B trip with a driver already going B → A.
              You ride for less. They earn on the way home. Nobody travels empty.
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="bg-surface-lowest rounded-2xl p-3 shadow-ambient">
              <div className="flex flex-col md:flex-row gap-2 items-stretch">

                <div className="flex-1 min-w-0">
                  <CityDropdown
                    value={from}
                    onChange={setFrom}
                    placeholder="Departure city"
                    label="From"
                    icon={<MapPin className="h-4 w-4 text-primary" />}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <CityDropdown
                    value={to}
                    onChange={setTo}
                    placeholder="Destination city"
                    label="To"
                    icon={<MapPin className="h-4 w-4 text-tertiary" />}
                  />
                </div>

                <label className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-low transition-colors cursor-text flex-shrink-0">
                  <div className="h-9 w-9 rounded-lg bg-surface-low flex items-center justify-center shrink-0">
                    <Calendar className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Date</p>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="bg-transparent outline-none font-semibold text-base text-foreground"
                    />
                  </div>
                </label>

                <label className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-low transition-colors cursor-text w-28 flex-shrink-0">
                  <div className="h-9 w-9 rounded-lg bg-surface-low flex items-center justify-center shrink-0">
                    <Users className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Seats</p>
                    <input
                      type="number"
                      min={1}
                      max={6}
                      value={seats}
                      onChange={(e) => setSeats(Number(e.target.value))}
                      className="w-full bg-transparent outline-none font-semibold text-base"
                    />
                  </div>
                </label>

                <button
                  type="submit"
                  className="bg-gradient-primary text-primary-foreground rounded-xl px-8 py-4 font-bold text-sm hover:shadow-lift transition-all active:scale-[0.98] flex items-center justify-center gap-2 whitespace-nowrap flex-shrink-0"
                >
                  <Search className="h-4 w-4" />
                  Search
                </button>
              </div>
            </form>

            {/* Stats */}
            <div className="flex flex-row flex-wrap gap-x-10 gap-y-3">
              <Stat value="42%" label="avg. passenger savings" />
              <Stat value="2.1×" label="driver trip utilization" />
              <Stat value="124k+" label="reverse-leg matches" />
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="w-full lg:w-[420px] xl:w-[480px] flex-shrink-0">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lift">
              <img
                src={heroHighway}
                alt="Empty highway curving through golden hills at dawn"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-surface-lowest/85 backdrop-blur-xl rounded-2xl p-5">
                <p className="text-[10px] uppercase tracking-widest font-black text-on-tertiary-container">
                  Live match · 2 minutes ago
                </p>
                <p className="font-display text-lg font-bold mt-1">
                  Mumbai → Pune paired with Pune → Mumbai
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  ₹680 saved · 4 seats filled both legs
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Popular Routes */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <span className="text-[11px] uppercase tracking-widest font-black text-secondary">The corridors</span>
            <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight mt-1">Popular intercity lanes</h2>
          </div>
          <Link
            to="/find-rides"
            search={{ from: "Delhi", to: "Jaipur", date: "", seats: 1 }}
            className="text-sm font-semibold text-primary inline-flex items-center gap-1 hover:gap-2 transition-all"
          >
            Browse all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {POPULAR_ROUTES.map((r) => (
            <Link
              key={`${r.from}-${r.to}`}
              to="/find-rides"
              search={{ from: r.from, to: r.to, date: "", seats: 1 }}
              className="group bg-surface-lowest rounded-2xl p-6 shadow-ambient hover:-translate-y-1 hover:shadow-lift transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-display text-2xl font-bold tracking-tight">
                    {r.from} <span className="text-muted-foreground font-normal">→</span> {r.to}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest font-bold">
                    {r.distance} · {r.duration}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="bg-surface-low rounded-3xl p-8 md:p-14 grid md:grid-cols-3 gap-8 md:gap-12">
          <div className="md:col-span-3 mb-2">
            <span className="text-[11px] uppercase tracking-widest font-black text-secondary">How it works</span>
            <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight mt-1 max-w-2xl">
              The matching engine that turns one trip into two.
            </h2>
          </div>
          {STEPS.map((s, i) => (
            <div key={s.title} className="space-y-3">
              <div className="font-display text-5xl font-black text-primary/30 tabular-nums">0{i + 1}</div>
              <h3 className="font-display text-xl font-bold tracking-tight">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

const STEPS = [
  {
    title: "Post or search",
    body: "Drivers post their planned A → B trip. Passengers search the same route. Both sides feed the matching pool with time windows and seat counts.",
  },
  {
    title: "Reverse-leg pairing",
    body: "Our engine pairs each driver's empty return B → A with passengers traveling that direction in a compatible time window — same fleet, two filled legs.",
  },
  {
    title: "Confirm & ride",
    body: "Both sides confirm in one tap. We share verified profiles, vehicle details, and a live route — no haggling, no empty seats.",
  },
];

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="font-display text-2xl font-black text-foreground tracking-tight">{value}</span>
      <span className="text-xs uppercase tracking-widest font-bold text-muted-foreground">{label}</span>
    </div>
  );
}
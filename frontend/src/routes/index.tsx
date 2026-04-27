import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Calendar, MapPin, Search, Sparkles, Users } from "lucide-react";
import heroHighway from "@/assets/hero.png";
import { POPULAR_ROUTES } from "@/lib/mockData";

export const Route = createFileRoute("/")({
    head: () => ({
        meta: [
            { title: "iRide — Premium Intercity Rides, Smarter Returns" },
            {
                name: "description",
                content:
                    "Match with drivers returning empty so you travel intercity for less, while drivers fill the seat on every leg.",
            },
            { property: "og:title", content: "iRide — Smarter Intercity Travel" },
            {
                property: "og:description",
                content: "Reverse-leg matching that cuts passenger fares and lifts driver utilization.",
            },
        ],
    }),
    component: Index,
});

function Index() {
    const navigate = useNavigate();
    const [from, setFrom] = useState("Delhi");
    const [to, setTo] = useState("Jaipur");
    const [date, setDate] = useState("");
    const [seats, setSeats] = useState(1);

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        navigate({ to: "/find-rides", search: { from, to, date, seats } });
    }

    return (
        <main>
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-gradient-hero" />
                <div className="mx-auto max-w-7xl px-6 pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    <div className="lg:col-span-7 space-y-8">
                        <span className="inline-flex items-center gap-2 rounded-full bg-tertiary-container text-on-tertiary-container px-3 py-1.5 text-[11px] font-black uppercase tracking-wider">
                            <Sparkles className="h-3.5 w-3.5" />
                            Reverse-leg matching · Live in 18 cities
                        </span>
                        <h1 className="font-display text-5xl md:text-7xl font-black tracking-tighter text-balance leading-[1.02]">
                            The empty return seat,
                            <span className="block text-primary">finally has a passenger.</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                            iRide pairs your A → B trip with a driver already going B → A.
                            You ride for less. They earn on the way home. Nobody travels empty.
                        </p>

                        {/* Search card */}
                        <form
                            onSubmit={handleSearch}
                            className="bg-surface-lowest rounded-2xl p-3 md:p-4 shadow-ambient grid grid-cols-1 md:grid-cols-[1fr_1fr_auto_auto_auto] gap-2 md:gap-3 items-stretch"
                        >
                            <Field icon={<MapPin className="h-4 w-4 text-primary" />} label="From">
                                <input
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}
                                    className="w-full bg-transparent outline-none font-semibold text-base placeholder:text-muted-foreground"
                                    placeholder="Departure city"
                                />
                            </Field>
                            <Field icon={<MapPin className="h-4 w-4 text-tertiary" />} label="To">
                                <input
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                    className="w-full bg-transparent outline-none font-semibold text-base placeholder:text-muted-foreground"
                                    placeholder="Destination"
                                />
                            </Field>
                            <Field icon={<Calendar className="h-4 w-4 text-secondary" />} label="Date">
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="bg-transparent outline-none font-semibold text-base"
                                />
                            </Field>
                            <Field icon={<Users className="h-4 w-4 text-secondary" />} label="Seats">
                                <input
                                    type="number"
                                    min={1}
                                    max={6}
                                    value={seats}
                                    onChange={(e) => setSeats(Number(e.target.value))}
                                    className="w-14 bg-transparent outline-none font-semibold text-base"
                                />
                            </Field>
                            <button
                                type="submit"
                                className="bg-gradient-primary text-primary-foreground rounded-xl px-6 font-bold text-sm hover:shadow-lift transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                <Search className="h-4 w-4" />
                                Search
                            </button>
                        </form>

                        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
                            <Stat value="42%" label="avg. passenger savings" />
                            <Stat value="2.1×" label="driver trip utilization" />
                            <Stat value="124k+" label="reverse-leg matches" />
                        </div>
                    </div>

                    <div className="lg:col-span-5 relative">
                        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lift">
                            <img
                                src={heroHighway}
                                alt="Empty highway curving through golden hills at dawn"
                                width={1600}
                                height={1100}
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

            {/* Popular routes */}
            <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
                <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
                    <div>
                        <span className="text-[11px] uppercase tracking-widest font-black text-secondary">
                            The corridors
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight mt-1">
                            Popular intercity lanes
                        </h2>
                    </div>
                    <Link
                        to="/find-rides"
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

            {/* How it works */}
            <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
                <div className="bg-surface-low rounded-3xl p-8 md:p-14 grid md:grid-cols-3 gap-8 md:gap-12">
                    <div className="md:col-span-3 mb-2">
                        <span className="text-[11px] uppercase tracking-widest font-black text-secondary">
                            How it works
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight mt-1 max-w-2xl">
                            The matching engine that turns one trip into two.
                        </h2>
                    </div>
                    {STEPS.map((s, i) => (
                        <div key={s.title} className="space-y-3">
                            <div className="font-display text-5xl font-black text-primary/30 tabular-nums">
                                0{i + 1}
                            </div>
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
        body:
            "Drivers post their planned A → B trip. Passengers search the same route. Both sides feed the matching pool with time windows and seat counts.",
    },
    {
        title: "Reverse-leg pairing",
        body:
            "Our engine pairs each driver's empty return B → A with passengers traveling that direction in a compatible time window — same fleet, two filled legs.",
    },
    {
        title: "Confirm & ride",
        body:
            "Both sides confirm in one tap. We share verified profiles, vehicle details, and a live route — no haggling, no empty seats.",
    },
];

function Field({
    icon,
    label,
    children,
}: {
    icon: React.ReactNode;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <label className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-low transition-colors cursor-text">
            <div className="h-9 w-9 rounded-lg bg-surface-low flex items-center justify-center shrink-0">
                {icon}
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                    {label}
                </p>
                {children}
            </div>
        </label>
    );
}

function Stat({ value, label }: { value: string; label: string }) {
    return (
        <div>
            <span className="font-display text-2xl font-black text-foreground tracking-tight">
                {value}
            </span>{" "}
            <span className="text-xs uppercase tracking-widest font-bold">{label}</span>
        </div>
    );
}

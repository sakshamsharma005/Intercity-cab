import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Calendar, Car, IndianRupee, MapPin, RotateCw, Users, Sparkles } from "lucide-react";

export const Route = createFileRoute("/post-ride")({
  head: () => ({
    meta: [
      { title: "Post a Ride — iRide" },
      {
        name: "description",
        content:
          "Drivers: post your intercity trip and let iRide match passengers for both your outbound and return legs.",
      },
      { property: "og:title", content: "Post a Ride — iRide" },
      {
        property: "og:description",
        content: "Fill seats on your outbound trip and your empty return leg.",
      },
    ],
  }),
  component: PostRide,
});

function PostRide() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    departTime: "",
    returnDate: "",
    returnTime: "",
    car: "",
    seats: 3,
    price: 1000,
  });
  const [submitted, setSubmitted] = useState(false);

  const matchEstimate = useMemo(() => {
    if (!form.from || !form.to) return null;
    const seats = form.seats;
    return {
      outbound: Math.min(seats, 2 + (form.from.length % 3)),
      return: Math.min(seats, 1 + (form.to.length % 3)),
      revenue: seats * form.price * 1.7,
    };
  }, [form]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => navigate({ to: "/find-rides", search: { from: form.from, to: form.to, date: form.date, seats: 1 } }), 1800);
  }

  if (submitted) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-tertiary-container text-on-tertiary-container mb-6">
          <RotateCw className="h-7 w-7" />
        </div>
        <h1 className="font-display text-4xl font-black tracking-tighter">
          Trip posted. Matching now.
        </h1>
        <p className="text-muted-foreground mt-3">
          We're scanning {form.to} → {form.from} return-leg passengers in your time window.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 md:py-14">
      <div className="mb-10">
        <p className="text-[11px] uppercase tracking-widest font-black text-secondary">
          For drivers
        </p>
        <h1 className="font-display text-4xl md:text-6xl font-black tracking-tighter mt-2 max-w-3xl text-balance">
          Post your trip. Earn on both legs.
        </h1>
        <p className="text-muted-foreground mt-3 max-w-2xl">
          Tell us where and when you're driving. We'll auto-match passengers for your outbound
          journey and your empty return.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Section title="Route" icon={<MapPin className="h-4 w-4" />}>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="From city" value={form.from} onChange={(v) => setForm({ ...form, from: v })} placeholder="e.g. Delhi" required />
              <Input label="To city" value={form.to} onChange={(v) => setForm({ ...form, to: v })} placeholder="e.g. Jaipur" required />
            </div>
          </Section>

          <Section title="Outbound leg" icon={<Calendar className="h-4 w-4" />}>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input type="date" label="Departure date" value={form.date} onChange={(v) => setForm({ ...form, date: v })} required />
              <Input type="time" label="Departure time" value={form.departTime} onChange={(v) => setForm({ ...form, departTime: v })} required />
            </div>
          </Section>

          <Section title="Return leg (the empty one)" icon={<RotateCw className="h-4 w-4" />}>
            <p className="text-sm text-muted-foreground -mt-2 mb-4">
              Adding your return turns one trip into two. We'll prioritize matching reverse-direction passengers.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input type="date" label="Return date" value={form.returnDate} onChange={(v) => setForm({ ...form, returnDate: v })} />
              <Input type="time" label="Return time" value={form.returnTime} onChange={(v) => setForm({ ...form, returnTime: v })} />
            </div>
          </Section>

          <Section title="Vehicle & seats" icon={<Car className="h-4 w-4" />}>
            <Input label="Car model" value={form.car} onChange={(v) => setForm({ ...form, car: v })} placeholder="Toyota Innova Crysta" required />
            <div className="mt-4">
              <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-2">
                Seats available
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setForm({ ...form, seats: n })}
                    className={`h-10 w-10 rounded-full text-sm font-black transition-all ${
                      form.seats === n
                        ? "bg-gradient-primary text-primary-foreground shadow-ambient"
                        : "bg-surface-low text-foreground hover:bg-surface-high"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </Section>

          <Section title="Price per seat" icon={<IndianRupee className="h-4 w-4" />}>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-5xl font-black text-primary tabular-nums">
                ₹{form.price.toLocaleString("en-IN")}
              </span>
              <span className="text-sm text-muted-foreground">per seat</span>
            </div>
            <input
              type="range"
              min={300}
              max={5000}
              step={50}
              value={form.price}
              onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              className="w-full mt-4 accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground font-medium">
              <span>₹300</span>
              <span>₹5,000</span>
            </div>
          </Section>
        </div>

        {/* Sticky preview */}
        <aside className="lg:sticky lg:top-24 self-start space-y-4">
          <div className="bg-surface-lowest rounded-2xl p-6 shadow-ambient space-y-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <p className="text-[11px] uppercase tracking-widest font-black text-primary">
                Live match estimate
              </p>
            </div>
            <div>
              <p className="font-display text-3xl font-black tracking-tighter">
                {form.from || "From"} <span className="text-muted-foreground font-normal">→</span>{" "}
                {form.to || "To"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {form.date || "Pick a date"} · {form.departTime || "—"}
              </p>
            </div>

            {matchEstimate ? (
              <div className="space-y-3 pt-2">
                <Stat label="Outbound matches" value={`${matchEstimate.outbound} likely`} />
                <Stat label="Return-leg matches" value={`${matchEstimate.return} likely`} />
                <Stat
                  label="Projected revenue"
                  value={`₹${Math.round(matchEstimate.revenue).toLocaleString("en-IN")}`}
                  highlight
                />
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Add your route to see a match forecast.
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-primary text-primary-foreground rounded-xl px-6 py-3.5 font-bold text-sm hover:shadow-lift transition-all active:scale-[0.98]"
            >
              Post Ride & Start Matching
            </button>
            <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground text-center">
              Free to post · Pay only when seats book
            </p>
          </div>

          <div className="bg-tertiary-container text-on-tertiary-container rounded-2xl p-5 flex items-start gap-3">
            <Users className="h-5 w-5 shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed">
              Drivers who add a return leg fill <strong>2.1× more seats</strong> on average.
            </p>
          </div>
        </aside>
      </form>
    </main>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-surface-lowest rounded-2xl p-6 md:p-7 shadow-ambient">
      <div className="flex items-center gap-2 mb-5">
        <div className="h-8 w-8 rounded-lg bg-surface-low flex items-center justify-center text-primary">
          {icon}
        </div>
        <h2 className="font-display text-lg font-bold tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-1.5 w-full bg-surface-low rounded-xl px-4 py-3 text-base font-semibold outline-none focus:ring-2 focus:ring-primary/40 transition-all"
      />
    </label>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs uppercase font-bold tracking-widest text-muted-foreground">
        {label}
      </span>
      <span
        className={`font-display font-black tabular-nums ${
          highlight ? "text-primary text-xl" : "text-foreground text-base"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

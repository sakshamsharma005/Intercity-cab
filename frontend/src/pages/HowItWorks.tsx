import { Link } from "react-router-dom";
import { ArrowRight, RotateCw, ShieldCheck, Sparkles } from "lucide-react";

export default function HowItWorks() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-14 md:py-20 space-y-20">
      <header className="space-y-6 max-w-3xl">
        <span className="text-[11px] uppercase tracking-widest font-black text-secondary">The platform</span>
        <h1 className="font-display text-5xl md:text-7xl font-black tracking-tighter text-balance leading-[1.02]">
          One trip should fill <span className="text-primary">two cars worth</span> of seats.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Intercity drivers spend nearly half their kilometers empty — driving home alone after a drop.
          iRide's matching engine treats every trip as a pair: outbound and return.
          Passengers ride for less. Drivers earn on both legs.
        </p>
      </header>

      <section className="grid md:grid-cols-3 gap-5">
        {PILLARS.map((p) => (
          <div key={p.title} className="bg-surface-lowest rounded-2xl p-7 shadow-ambient space-y-4">
            <div className="h-11 w-11 rounded-xl bg-gradient-primary text-primary-foreground flex items-center justify-center">
              <p.icon className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl font-bold tracking-tight">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
          </div>
        ))}
      </section>

      <section className="bg-surface-low rounded-3xl p-8 md:p-14 space-y-12">
        <div>
          <span className="text-[11px] uppercase tracking-widest font-black text-secondary">The booking flow</span>
          <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight mt-2">
            From post to pickup, in four steps.
          </h2>
        </div>
        <ol className="space-y-10">
          {FLOW.map((step, i) => (
            <li key={step.title} className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start">
              <div className="font-display text-6xl md:text-7xl font-black text-primary/25 tabular-nums leading-none">
                0{i + 1}
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight">{step.title}</h3>
                <p className="text-muted-foreground mt-2 leading-relaxed max-w-2xl">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-gradient-primary text-primary-foreground rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight max-w-xl">
            Ready to stop traveling empty?
          </h2>
          <p className="text-primary-foreground/85 mt-2">Search rides or post your next intercity trip in under a minute.</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Link to="/find-rides?from=Delhi&to=Jaipur&seats=1" className="inline-flex items-center gap-2 bg-surface-lowest text-foreground rounded-xl px-6 py-3 font-bold text-sm hover:shadow-lift transition-all">
            Find a ride <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/post-ride" className="inline-flex items-center gap-2 bg-foreground/10 text-primary-foreground rounded-xl px-6 py-3 font-bold text-sm hover:bg-foreground/20 transition-all">
            Post a ride <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

const PILLARS = [
  { icon: RotateCw, title: "Reverse-leg matching", body: "Every posted trip enters the pool as two legs. Our engine actively hunts for opposite-direction passengers in compatible time windows." },
  { icon: Sparkles, title: "Time-window intelligence", body: "Matches respect departure flexibility, expected travel time, and pickup proximity — not just same-day same-route." },
  { icon: ShieldCheck, title: "Verified, both sides", body: "Drivers pass ID, license and vehicle checks. Passenger profiles are confirmed by phone before any seat is booked." },
];

const FLOW = [
  { title: "Post or search the route", body: "Drivers list their planned A → B trip with optional return. Passengers search the same lane with a date and seat count." },
  { title: "The engine pairs reverse legs", body: "We score every potential match on direction, time window, seat capacity and pickup distance — surfacing the strongest pairs first." },
  { title: "Confirm in one tap", body: "Both sides see verified profiles, vehicle details and the projected fare. A single tap locks the seat — no haggling." },
  { title: "Ride, rate, repeat", body: "Live trip status keeps everyone informed. After arrival, both sides rate the ride — feeding the matching engine for next time." },
];

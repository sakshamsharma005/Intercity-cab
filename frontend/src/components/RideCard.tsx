import { Star, RotateCw, Armchair } from "lucide-react";
import { RouteLine } from "./RouteLine";
import type { Ride } from "@/lib/mockData";

export function RideCard({ ride }: { ride: Ride }) {
  return (
    <article className="group bg-surface-lowest rounded-2xl shadow-ambient hover:-translate-y-1 hover:shadow-lift transition-all duration-300">
      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-8 items-start">
        {/* Driver */}
        <div className="flex md:flex-col items-center md:items-center gap-3">
          <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center font-display font-bold text-lg shadow-ambient">
            {ride.driverInitial}
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-low">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            <span className="text-xs font-bold tabular-nums">{ride.rating}</span>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-5 min-w-0">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <div>
              <h3 className="font-display text-xl font-bold tracking-tight">
                {ride.driverName}
              </h3>
              <p className="text-sm text-muted-foreground">
                Driving {ride.car} · {ride.trips} trips
              </p>
            </div>
            <div className="md:hidden text-right">
              <PriceTag amount={ride.pricePerSeat} />
            </div>
          </div>

          <RouteLine
            fromTime={ride.departTime}
            fromLabel={ride.fromPoint}
            toTime={ride.arriveTime}
            toLabel={ride.toPoint}
            matched={ride.hasReturnMatch}
          />

          <div className="flex flex-wrap items-center gap-2">
            {ride.hasReturnMatch && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-tertiary-container text-on-tertiary-container text-[10px] font-black uppercase tracking-wider">
                <RotateCw className="h-3 w-3" />
                Reverse leg matched
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-high text-secondary text-[10px] font-bold uppercase tracking-wider">
              <Armchair className="h-3 w-3" />
              {ride.seatsLeft} {ride.seatsLeft === 1 ? "seat" : "seats"} left
            </span>
            {ride.returnDeparture && (
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                Return · {ride.returnDeparture}
              </span>
            )}
          </div>
        </div>

        {/* Price + CTA */}
        <div className="hidden md:flex flex-col items-end justify-between h-full gap-6 min-w-[140px]">
          <PriceTag amount={ride.pricePerSeat} />
          <button className="bg-gradient-primary text-primary-foreground px-7 py-3 rounded-xl font-bold text-sm hover:shadow-lift transition-all active:scale-95 w-full">
            Book Ride
          </button>
        </div>

        <button className="md:hidden bg-gradient-primary text-primary-foreground px-7 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 col-span-full">
          Book Ride
        </button>
      </div>
    </article>
  );
}

function PriceTag({ amount }: { amount: number }) {
  return (
    <div className="text-right">
      <div className="font-display text-3xl font-black text-primary tracking-tighter tabular-nums">
        ₹{amount.toLocaleString("en-IN")}
      </div>
      <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">
        per seat
      </p>
    </div>
  );
}

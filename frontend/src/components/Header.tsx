import { Link, NavLink } from "react-router-dom";
import { Bell, UserCircle2 } from "lucide-react";

export function Header() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-primary font-semibold transition-colors"
      : "text-secondary hover:text-foreground transition-colors";

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/75">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
         <img src="/favicon.png" alt="iRide logo" className="h-8 w-8 object-contain" />
          <span className="text-lg font-display font-bold tracking-tight">iRide</span>
        </Link>
        <nav className="hidden md:flex items-center gap-9 text-sm font-medium">
          <NavLink to="/find-rides" className={navLinkClass}>Find Rides</NavLink>
          <NavLink to="/post-ride" className={navLinkClass}>Post Ride</NavLink>
          <NavLink to="/how-it-works" className={navLinkClass}>How it Works</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <button className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full text-secondary hover:bg-surface-low transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <button className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full text-secondary hover:bg-surface-low transition-colors">
            <UserCircle2 className="h-5 w-5" />
          </button>
          <button className="bg-gradient-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lift transition-all active:scale-[0.98]">
            Join Now
          </button>
        </div>
      </div>
    </header>
  );
}

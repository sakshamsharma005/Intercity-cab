import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-black tracking-tighter text-foreground">404</h1>
        <h2 className="mt-4 font-display text-xl font-bold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">That route hasn't been mapped yet.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:shadow-lift transition-all"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}

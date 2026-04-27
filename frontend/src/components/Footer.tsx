export function Footer() {
  return (
    <footer className="mt-32 border-t border-border/40">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-sm">
        <div>
          <p className="font-display text-lg font-bold tracking-tight">iRide</p>
          <p className="text-muted-foreground mt-1">
            Premium intercity travel · Powered by reverse-leg matching
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-secondary uppercase tracking-widest text-xs font-bold">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Driver Program</a>
          <a href="#" className="hover:text-foreground">Contact</a>
        </div>
      </div>
    </footer>
  );
}

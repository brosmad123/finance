import React from 'react';

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 lg:px-20 py-12 border-t border-border/40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xs font-data">$</span>
          </div>
          <span className="text-sm font-heading font-medium text-foreground">Precision Wealth Portal</span>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          FY2026 · June Budget · Sales Account Representative · All figures in CAD
        </p>
        <p className="text-xs text-muted-foreground">
          Built with surgical precision
        </p>
      </div>
    </footer>
  );
}
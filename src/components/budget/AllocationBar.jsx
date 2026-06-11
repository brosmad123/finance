import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { INCOME_DATA, fmt, fmtPct, calcSubtotal, NEEDS, HYGIENE, FOOD_LIFE, WANTS } from '@/lib/budgetData';

const segments = [
  { label: "Needs", color: "bg-primary", value: calcSubtotal(NEEDS), icon: "🏠" },
  { label: "Hygiene", color: "bg-blue-400", value: calcSubtotal(HYGIENE), icon: "🧴" },
  { label: "Food & Life", color: "bg-amber-400", value: calcSubtotal(FOOD_LIFE), icon: "☕" },
  { label: "Wants", color: "bg-violet-500", value: calcSubtotal(WANTS), icon: "🎯" },
  { label: "Savings", color: "bg-success", value: INCOME_DATA.netPay - calcSubtotal(NEEDS) - calcSubtotal(HYGIENE) - calcSubtotal(FOOD_LIFE) - calcSubtotal(WANTS), icon: "💰" },
];

export default function AllocationBar() {
  const [hovered, setHovered] = useState(null);
  const total = INCOME_DATA.netPay;

  return (
    <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-data text-muted-foreground mb-2">How it's split up</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12">
            Where the money goes
          </h2>
        </motion.div>

        {/* Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
          className="relative"
        >
          <div className="flex h-16 md:h-20 rounded-2xl overflow-hidden shadow-lg">
            {segments.map((seg, i) => {
              const pct = seg.value / total;
              return (
                <motion.div
                  key={seg.label}
                  className={`${seg.color} relative cursor-pointer transition-all duration-300 flex items-center justify-center`}
                  style={{ width: `${pct * 100}%` }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-white text-xs md:text-sm font-medium opacity-90 truncate px-2">
                    {pct > 0.08 ? seg.label : ''}
                  </span>
                  
                  {hovered === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-28 left-1/2 -translate-x-1/2 bg-card border border-border rounded-xl p-4 shadow-xl z-50 whitespace-nowrap"
                    >
                      <p className="text-lg font-bold text-foreground">{seg.icon} {seg.label}</p>
                      <p className="text-sm font-data text-muted-foreground">{fmt(seg.value)}/mo · {fmt(seg.value * 12)}/yr</p>
                      <p className="text-xs text-primary font-medium mt-1">{fmtPct(pct)} of net income</p>
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-l border-t border-border rotate-45" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 md:gap-8 mt-8 justify-center">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${seg.color}`} />
              <span className="text-sm text-muted-foreground">{seg.label}</span>
              <span className="text-sm font-data text-foreground font-medium">{fmt(seg.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
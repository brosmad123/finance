import React from 'react';
import { motion } from 'framer-motion';
import { INCOME_DATA, fmt, fmtPct } from '@/lib/budgetData';

export default function LedgerTable({ title, subtitle, icon, items, subtotal }) {
  const net = INCOME_DATA.netPay;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{icon}</span>
        <div>
          <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          <div className="col-span-4">Category</div>
          <div className="col-span-2 text-right">Monthly</div>
          <div className="col-span-2 text-right">Annual</div>
          <div className="col-span-1 text-right">% Net</div>
          <div className="col-span-3">Notes</div>
        </div>

        {/* Rows */}
        {items.map((item, i) => (
          <motion.div
            key={item.category}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 border-t border-border/30 hover:bg-muted/30 transition-colors group"
          >
            <div className="col-span-4 flex items-center gap-3">
              <span className="text-lg">{item.emoji}</span>
              <div>
                <p className="font-medium text-foreground text-sm">{item.category}</p>
                <p className="text-xs text-muted-foreground md:hidden">{item.notes}</p>
              </div>
            </div>
            <div className="col-span-2 text-right font-data text-sm font-semibold text-foreground flex items-center md:justify-end">
              {fmt(item.monthly)}
            </div>
            <div className="col-span-2 text-right font-data text-sm text-muted-foreground hidden md:flex items-center justify-end">
              {fmt(item.monthly * 12)}
            </div>
            <div className="col-span-1 text-right font-data text-xs text-muted-foreground hidden md:flex items-center justify-end">
              {fmtPct(item.monthly / net)}
            </div>
            <div className="col-span-3 text-xs text-muted-foreground hidden md:flex items-center">
              {item.notes}
            </div>
          </motion.div>
        ))}

        {/* Subtotal */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 bg-muted/40 border-t-2 border-border/50">
          <div className="col-span-4 font-bold text-foreground text-sm">SUBTOTAL</div>
          <div className="col-span-2 text-right font-data font-bold text-primary text-sm">{fmt(subtotal)}</div>
          <div className="col-span-2 text-right font-data font-medium text-muted-foreground text-sm hidden md:block">{fmt(subtotal * 12)}</div>
          <div className="col-span-1 text-right font-data text-xs font-medium text-primary hidden md:block">{fmtPct(subtotal / net)}</div>
          <div className="col-span-3 hidden md:block" />
        </div>
      </div>
    </motion.div>
  );
}
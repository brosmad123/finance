import React from 'react';
import { motion } from 'framer-motion';
import { INCOME_DATA, fmt } from '@/lib/budgetData';

const deductions = [
  { label: "Gross Salary", value: INCOME_DATA.grossSalary, annual: INCOME_DATA.grossSalary * 12, note: "Sales Account Representative", isIncome: true },
  { label: "Federal Income Tax", value: INCOME_DATA.federalTax, annual: INCOME_DATA.federalTax * 12, note: "~20.5% effective federal rate" },
  { label: "Ontario Provincial Tax", value: INCOME_DATA.provincialTax, annual: INCOME_DATA.provincialTax * 12, note: "~9.15% effective provincial rate" },
  { label: "CPP (5.95%)", value: INCOME_DATA.cpp, annual: INCOME_DATA.cpp * 12, note: "Canada Pension Plan contribution" },
  { label: "EI (1.65%)", value: INCOME_DATA.ei, annual: INCOME_DATA.ei * 12, note: "Employment Insurance of 2026" },
];

export default function IncomeBreakdown() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-data text-muted-foreground mb-2">Paycheck breakdown</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12">
            Gross salary → take-home pay
          </h2>
        </motion.div>

        <div className="space-y-1">
          {deductions.map((d, i) => (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`flex items-center justify-between py-4 px-6 rounded-xl transition-colors hover:bg-muted/60 ${d.isIncome ? 'bg-card border border-border/50' : ''}`}
            >
              <div className="flex-1">
                <p className={`font-medium ${d.isIncome ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {d.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{d.note}</p>
              </div>
              <div className="text-right">
                <p className={`font-data font-semibold ${d.isIncome ? 'text-foreground' : 'text-destructive'}`}>
                  {fmt(d.value)}
                </p>
                <p className="text-xs font-data text-muted-foreground">{fmt(d.annual)}/yr</p>
              </div>
            </motion.div>
          ))}

          {/* Net Pay */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center justify-between py-5 px-6 rounded-xl bg-primary/5 border-2 border-primary/20 mt-4"
          >
            <div>
              <p className="font-bold text-lg text-foreground">✅ Net Take-Home Pay</p>
              <p className="text-xs text-muted-foreground">After all federal & provincial deductions</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-data font-bold text-primary">{fmt(INCOME_DATA.netPay)}</p>
              <p className="text-sm font-data text-muted-foreground">{fmt(INCOME_DATA.netPay * 12)}/yr</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
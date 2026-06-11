import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { INCOME_DATA, fmt } from '@/lib/budgetData';

function AnimatedNumber({ value, prefix = '', suffix = '', duration = 2000 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(value * eased);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  const formatted = suffix.includes('%')
    ? display.toFixed(1)
    : new Intl.NumberFormat('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(display);

  return (
    <span ref={ref} className="font-data tabular-nums">
      {prefix}{formatted}{suffix}
    </span>
  );
}

const savingsRate = 35.4;
const monthlySavings = 1388.10;
const totalExpenses = 2533.78;

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 md:px-12 lg:px-20">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }} />

      <div className="relative z-10 max-w-5xl mx-auto w-full pt-24 pb-16">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="h-px w-8 bg-primary/60" />
          <span className="text-xs font-data text-muted-foreground tracking-[0.15em] uppercase">June 2026 · Budget Snapshot · CAD</span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight text-foreground leading-[1.05] mb-4">
            My Monthly<br />Budget
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
            A breakdown of where my money comes from and where it all goes — rent, food, subscriptions, and what's left over.
          </p>
        </motion.div>

        {/* 3 stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14 mb-12">
          {[
            {
              label: "Take-home pay",
              sublabel: "after taxes & deductions",
              value: <AnimatedNumber value={INCOME_DATA.netPay} prefix="$" />,
              color: "text-foreground",
              delay: 0.2,
            },
            {
              label: "Going to savings",
              sublabel: "35.4% of take-home",
              value: <AnimatedNumber value={monthlySavings} prefix="$" />,
              color: "text-success",
              delay: 0.3,
            },
            {
              label: "Total spending",
              sublabel: "across all categories",
              value: <AnimatedNumber value={totalExpenses} prefix="$" />,
              color: "text-foreground",
              delay: 0.4,
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: stat.delay }}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">{stat.label}</p>
              <p className={`text-3xl md:text-4xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.sublabel}</p>
            </motion.div>
          ))}
        </div>

        {/* Spending bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Spent this month</span>
            <span className="font-data">{fmt(totalExpenses)} of {fmt(INCOME_DATA.netPay)}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(totalExpenses / INCOME_DATA.netPay) * 100}%` }}
              transition={{ delay: 0.9, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full bg-primary"
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-muted-foreground">64.6% spent</span>
            <span className="text-xs text-success font-medium font-data">+{fmt(monthlySavings)} saved</span>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex items-center gap-3 mt-16 text-muted-foreground"
        >
          <motion.div
            animate={{ x: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <span className="text-lg">↓</span>
          </motion.div>
          <span className="text-sm">Scroll to see the full breakdown</span>
        </motion.div>
      </div>
    </section>
  );
}
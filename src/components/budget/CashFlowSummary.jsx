import React from 'react';
import { motion } from 'framer-motion';
import { INCOME_DATA, fmt, calcSubtotal, NEEDS, HYGIENE, FOOD_LIFE, WANTS } from '@/lib/budgetData';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const needsTotal = calcSubtotal(NEEDS);
const hygieneTotal = calcSubtotal(HYGIENE);
const foodTotal = calcSubtotal(FOOD_LIFE);
const wantsTotal = calcSubtotal(WANTS);
const totalExpenses = needsTotal + hygieneTotal + foodTotal + wantsTotal;
const savings = INCOME_DATA.netPay - totalExpenses;

const pieData = [
  { name: 'Needs', value: needsTotal, color: '#2563EB' },
  { name: 'Hygiene', value: hygieneTotal, color: '#60A5FA' },
  { name: 'Food & Life', value: foodTotal, color: '#F59E0B' },
  { name: 'Wants', value: wantsTotal, color: '#8B5CF6' },
  { name: 'Savings', value: savings, color: '#059669' },
];

const barData = [
  { name: 'Income', monthly: INCOME_DATA.netPay, annual: INCOME_DATA.netPay * 12 },
  { name: 'Needs', monthly: needsTotal, annual: needsTotal * 12 },
  { name: 'Hygiene', monthly: hygieneTotal, annual: hygieneTotal * 12 },
  { name: 'Food', monthly: foodTotal, annual: foodTotal * 12 },
  { name: 'Wants', monthly: wantsTotal, annual: wantsTotal * 12 },
  { name: 'Savings', monthly: savings, annual: savings * 12 },
];

const summaryRows = [
  { emoji: "💰", label: "Income after mandatory taxes", monthly: INCOME_DATA.netPay },
  { emoji: "🏠", label: "Total Needs", monthly: needsTotal },
  { emoji: "🧴", label: "Total Hygiene + Care", monthly: hygieneTotal },
  { emoji: "☕", label: "Total Food + Life", monthly: foodTotal },
  { emoji: "🆓", label: "Free Resources", monthly: 0 },
  { emoji: "🎯", label: "Total Wants", monthly: wantsTotal },
  { emoji: "📋", label: "Total Expenses", monthly: totalExpenses },
  { emoji: "✅", label: "Monthly Savings", monthly: savings, highlight: true },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
        <p className="font-medium text-foreground text-sm">{payload[0].payload.name}</p>
        <p className="font-data text-primary text-sm">{fmt(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export default function CashFlowSummary() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-data text-muted-foreground mb-2">End of month</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12">
            Cash flow summary
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card border border-border/50 rounded-2xl p-8"
          >
            <h3 className="text-lg font-heading font-semibold text-foreground mb-6">Expense Distribution</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={110}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-4 justify-center mt-4">
              {pieData.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-xs text-muted-foreground">{d.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card border border-border/50 rounded-2xl p-8"
          >
            <h3 className="text-lg font-heading font-semibold text-foreground mb-6">Monthly Breakdown</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="monthly" fill="#2563EB" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Summary Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card border border-border/50 rounded-2xl overflow-hidden"
        >
          <div className="grid grid-cols-3 gap-4 px-6 py-3 bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <div>Category</div>
            <div className="text-right">Monthly (CAD)</div>
            <div className="text-right">Annual (CAD)</div>
          </div>
          {summaryRows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-3 gap-4 px-6 py-4 border-t border-border/30 ${row.highlight ? 'bg-success/5 border-t-2 border-success/20' : 'hover:bg-muted/30'} transition-colors`}
            >
              <div className="flex items-center gap-2">
                <span>{row.emoji}</span>
                <span className={`text-sm ${row.highlight ? 'font-bold text-success' : 'font-medium text-foreground'}`}>
                  {row.label}
                </span>
              </div>
              <div className={`text-right font-data text-sm ${row.highlight ? 'font-bold text-success' : 'text-foreground'}`}>
                {fmt(row.monthly)}
              </div>
              <div className={`text-right font-data text-sm ${row.highlight ? 'font-bold text-success' : 'text-muted-foreground'}`}>
                {fmt(row.monthly * 12)}
              </div>
            </div>
          ))}

          {/* Rates */}
          <div className="grid grid-cols-2 gap-4 px-6 py-5 bg-muted/40 border-t-2 border-border/50">
            <div className="flex items-center gap-3">
              <span className="text-lg">📈</span>
              <div>
                <p className="text-sm font-bold text-foreground">Savings Rate</p>
                <p className="text-xs text-muted-foreground">Of net monthly income</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-data font-bold text-success">35.4%</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 px-6 py-5 border-t border-border/30">
            <div className="flex items-center gap-3">
              <span className="text-lg">🔢</span>
              <div>
                <p className="text-sm font-bold text-foreground">Expenses % of Net</p>
                <p className="text-xs text-muted-foreground">Total spending ratio</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-data font-bold text-primary">64.6%</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { FREE_RESOURCES } from '@/lib/budgetData';
import { Badge } from '@/components/ui/badge';

export default function FreeResources() {
  return (
    <section className="px-6 md:px-12 lg:px-20 py-20 md:py-28">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-data text-muted-foreground mb-2">Things I use for free</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            No cost, still useful
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            Apps and services I use every day that don't cost anything.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FREE_RESOURCES.map((item, i) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="group relative"
            >
              <div className="border border-dashed border-border/60 rounded-xl p-5 hover:border-success/40 hover:bg-success/[0.02] transition-all duration-300">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-foreground text-sm">{item.category}</p>
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-success/30 text-success font-medium">
                        FREE
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.notes}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 mt-2">{item.type}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Total monthly cost: <span className="font-data font-bold text-success">$0.00</span> · {FREE_RESOURCES.length} services leveraged
          </p>
        </motion.div>
      </div>
    </section>
  );
}
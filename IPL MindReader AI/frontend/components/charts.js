"use client";

import { motion } from 'framer-motion';

export function SparkBarChart({ data = [] }) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);
  return (
    <div className="grid gap-3">
      {data.map((item) => (
        <div key={item.label}>
          <div className="mb-1 flex items-center justify-between text-xs text-white/50">
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/8">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(item.value / maxValue) * 100}%` }}
              transition={{ duration: 0.8 }}
              className="h-full rounded-full bg-[linear-gradient(90deg,#f7c948,#53c9ff)]"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

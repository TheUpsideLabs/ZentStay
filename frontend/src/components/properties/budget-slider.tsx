"use client";

import { useState } from "react";

export function BudgetSlider() {
  const [budget, setBudget] = useState(10000);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">
          Max Budget
        </span>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
          ₹{budget.toLocaleString()}
        </span>
      </div>

      <input
        type="range"
        min={4000}
        max={20000}
        step={500}
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
        className="h-2 w-full cursor-pointer accent-blue-600"
      />

      <div className="flex justify-between text-xs text-slate-400">
        <span>₹4K</span>
        <span>₹20K</span>
      </div>
    </div>
  );
}
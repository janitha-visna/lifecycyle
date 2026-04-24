import React from "react";
import { Cycle } from "@/types";

interface CycleSelectorProps {
  cycles: Cycle[];
  currentCycleId: string;
  onCycleChange: (id: string) => void;
}

export const CycleSelector: React.FC<CycleSelectorProps> = ({
  cycles,
  currentCycleId,
  onCycleChange,
}) => {
  return (
    <div className="relative inline-block text-left w-full sm:w-auto">
      <label className="block text-xs text-slate-500 font-semibold uppercase mb-1 sm:hidden">
        Select Cycle
      </label>

      <div className="flex bg-slate-100 rounded-lg p-1">
        {cycles.map((cycle) => (
          <button
            key={cycle.id}
            onClick={() => onCycleChange(cycle.id)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
              currentCycleId === cycle.id
                ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {cycle.name}
          </button>
        ))}
      </div>
    </div>
  );
};

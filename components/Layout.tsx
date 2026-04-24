import React from 'react';
import { Cycle } from '../types';
import { ShieldCheck, LogOut, HelpCircle } from 'lucide-react';

interface LayoutProps {
  cycles: Cycle[];
  currentCycleId: string;
  currentStageId: string;
  onCycleChange: (id: string) => void;
  onStageChange: (id: string) => void;
  children: React.ReactNode;
  headerActions?: React.ReactNode;
  cycleSelector?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ 
  cycles, 
  currentCycleId, 
  currentStageId, 
  onCycleChange, 
  onStageChange, 
  children,
  headerActions,
  cycleSelector
}) => {
  const currentCycle = cycles.find(c => c.id === currentCycleId);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Row 1: Header (Logo + Actions) */}
      <header className="bg-slate-900 border-b border-slate-800 shadow-md z-30 sticky top-0 text-white">
        <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
              <ShieldCheck className="w-7 h-7 text-accent mr-3" />
              <span className="font-bold text-lg tracking-tight text-white">CertManager</span>
          </div>
          
          <div className="flex items-center space-x-4">
              {headerActions}
              <div className="h-6 w-px bg-slate-700 mx-2 hidden sm:block"></div>
              <button className="text-slate-400 hover:text-white transition-colors" title="Help">
                <HelpCircle className="w-5 h-5" />
              </button>
              <button className="text-slate-400 hover:text-white transition-colors" title="Sign Out">
                <LogOut className="w-5 h-5" />
              </button>
          </div>
        </div>
      </header>

      {/* Row 2: Cycle Selector */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3 z-20 shadow-sm">
           {cycleSelector}
      </div>

      {/* Row 3: Stage Navigation Tabs (Horizontal) */}
      {currentCycle && (
          <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 z-10 overflow-x-auto no-scrollbar">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  {currentCycle.stages.map((stage) => {
                       const isActive = currentStageId === stage.id;
                       return (
                          <button
                              key={stage.id}
                              onClick={() => onStageChange(stage.id)}
                              className={`
                                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                                  ${isActive 
                                      ? 'border-accent text-accent' 
                                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}
                              `}
                          >
                              {stage.name}
                          </button>
                       );
                  })}
              </nav>
          </div>
      )}

      {/* Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-slate-50">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
      </main>
    </div>
  );
};
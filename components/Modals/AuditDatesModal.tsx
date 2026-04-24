import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { AuditDate } from '../../types';
import { CalendarDays, Filter } from 'lucide-react';

interface AuditDatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  dates: AuditDate[];
}

export const AuditDatesModal: React.FC<AuditDatesModalProps> = ({ isOpen, onClose, dates }) => {
  const [activeTab, setActiveTab] = useState<string>('All');
  
  // Extract unique cycles for tabs
  const availableCycles = ['All', ...Array.from(new Set(dates.map(d => d.cycleName))).sort()];

  // Filter dates based on active tab
  const filteredDates = activeTab === 'All' 
    ? dates 
    : dates.filter(d => d.cycleName === activeTab);

  // Group filtered dates by cycle name for display
  const groupedDates = filteredDates.reduce((acc, date) => {
    if (!acc[date.cycleName]) {
      acc[date.cycleName] = [];
    }
    acc[date.cycleName].push(date);
    return acc;
  }, {} as Record<string, AuditDate[]>);

  const displayedCycles = Object.keys(groupedDates).sort();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Audit Schedule" maxWidth="max-w-3xl">
      {/* Tabs */}
      <div className="flex items-center space-x-1 mb-6 bg-slate-100 p-1 rounded-lg">
          {availableCycles.map((cycle) => (
             <button
                key={cycle}
                onClick={() => setActiveTab(cycle)}
                className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                   activeTab === cycle 
                   ? 'bg-white text-slate-900 shadow-sm' 
                   : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
             >
                {cycle}
             </button>
          ))}
      </div>

      <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
        {displayedCycles.length === 0 ? (
           <div className="text-center py-12 flex flex-col items-center justify-center text-slate-500">
                <CalendarDays className="w-10 h-10 mb-3 text-slate-300" />
                <p>No scheduled audits found for this selection.</p>
           </div>
        ) : (
            displayedCycles.map(cycleName => (
                <div key={cycleName} className="border border-slate-200 rounded-lg overflow-hidden animate-fadeIn">
                    <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">{cycleName}</h3>
                    </div>
                    <div className="divide-y divide-slate-100 bg-white">
                        {groupedDates[cycleName].map((item, index) => (
                            <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                                <div className="mb-2 sm:mb-0">
                                    <span className="text-sm font-semibold text-accent block mb-1">{item.stage}</span>
                                    <div className="flex items-center space-x-2">
                                        <span className={`h-2 w-2 rounded-full ${
                                            item.status === 'Completed' ? 'bg-green-500' : 
                                            item.status === 'Delayed' ? 'bg-red-500' : 'bg-blue-500'
                                        }`}></span>
                                        <span className="text-xs font-medium text-slate-500">{item.status}</span>
                                    </div>
                                </div>
                                
                                <div className="flex space-x-6">
                                    <div className="text-right">
                                        <p className="text-[10px] text-slate-400 uppercase font-bold">Planned</p>
                                        <p className="text-sm font-mono text-slate-900">{item.plannedDate}</p>
                                    </div>
                                    <div className="text-right w-24">
                                        <p className="text-[10px] text-slate-400 uppercase font-bold">Actual</p>
                                        <p className={`text-sm font-mono font-medium ${item.actualDate ? 'text-slate-900' : 'text-slate-400 italic'}`}>
                                            {item.actualDate || '--'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))
        )}
      </div>
      
      <div className="mt-4 flex justify-end">
         <button onClick={onClose} className="px-4 py-2 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50">Close</button>
      </div>
    </Modal>
  );
};
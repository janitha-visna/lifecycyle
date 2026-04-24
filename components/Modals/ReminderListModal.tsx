import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Reminder } from '../../types';
import { AlertCircle, CheckCircle2, Clock, AlertTriangle, Filter } from 'lucide-react';

interface ReminderListModalProps {
  isOpen: boolean;
  onClose: () => void;
  reminders: Reminder[];
}

type FilterType = 'All' | 'Overdue' | 'Pending' | 'Completed';

export const ReminderListModal: React.FC<ReminderListModalProps> = ({ isOpen, onClose, reminders }) => {
  const [filter, setFilter] = useState<FilterType>('All');

  // Filter reminders based on selection
  const filteredReminders = reminders.filter(r => {
      if (filter === 'All') return true;
      return r.status === filter;
  });

  const overdue = filteredReminders.filter(r => r.status === 'Overdue');
  const pending = filteredReminders.filter(r => r.status === 'Pending');
  const completed = filteredReminders.filter(r => r.status === 'Completed');

  const renderSection = (title: string, items: Reminder[], type: 'overdue' | 'pending' | 'completed') => {
    if (items.length === 0) return null;

    let headerColor = '';
    let icon = null;

    switch(type) {
        case 'overdue': 
            headerColor = 'text-red-700 bg-red-50 border-red-200';
            icon = <AlertCircle className="w-5 h-5 mr-2" />;
            break;
        case 'pending':
            headerColor = 'text-yellow-700 bg-yellow-50 border-yellow-200';
            icon = <Clock className="w-5 h-5 mr-2" />;
            break;
        case 'completed':
            headerColor = 'text-green-700 bg-green-50 border-green-200';
            icon = <CheckCircle2 className="w-5 h-5 mr-2" />;
            break;
    }

    return (
        <div className="mb-6 last:mb-0 animate-fadeIn">
            <h3 className={`flex items-center px-4 py-2 rounded-t-lg border-t border-x font-semibold ${headerColor}`}>
                {icon} {title} ({items.length})
            </h3>
            <div className="border border-slate-200 rounded-b-lg divide-y divide-slate-100 bg-white">
                {items.map(reminder => (
                    <div key={reminder.id} className="p-4 hover:bg-slate-50 transition-colors">
                         <div className="flex justify-between items-start">
                            <div>
                                <h4 className="text-sm font-bold text-slate-900">{reminder.folderName}</h4>
                                <p className="text-sm text-slate-600 mt-1">{reminder.message}</p>
                            </div>
                            <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                {reminder.date}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reminders & Warnings" maxWidth="max-w-2xl">
      {/* Filter Tabs */}
      <div className="flex items-center space-x-1 mb-6 bg-slate-100 p-1 rounded-lg">
          {(['All', 'Overdue', 'Pending', 'Completed'] as FilterType[]).map((f) => (
             <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                   filter === f 
                   ? 'bg-white text-slate-900 shadow-sm' 
                   : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
             >
                {f}
             </button>
          ))}
      </div>

      <div className="max-h-[60vh] overflow-y-auto pr-2">
        {filteredReminders.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center justify-center text-slate-500">
                <Filter className="w-10 h-10 mb-3 text-slate-300" />
                <p>No items found for this filter.</p>
            </div>
        ) : (
            <>
                {renderSection('Overdue Items', overdue, 'overdue')}
                {renderSection('Pending Tasks', pending, 'pending')}
                {renderSection('Completed', completed, 'completed')}
            </>
        )}
      </div>
      
      <div className="mt-6 flex justify-end">
        <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
            Close
        </button>
      </div>
    </Modal>
  );
};
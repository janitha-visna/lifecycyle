import React from "react";
import {
  CreditCard,
  Phone,
  CalendarDays,
  Bell,
  AlertTriangle,
  Info,
} from "lucide-react";

interface HeaderActionsProps {
  overdueCount: number;
  onOpenHistory: () => void;
  onOpenReminders: () => void;
  onOpenPayments: () => void;
  onOpenClientInfo: () => void;
  onOpenAuditDates: () => void;
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({
  overdueCount,
  onOpenHistory,
  onOpenReminders,
  onOpenPayments,
  onOpenClientInfo,
  onOpenAuditDates,
}) => {
  return (
    <>
      <div className="flex items-center space-x-2 mr-2 border-r border-slate-800 pr-4">
        <button
          onClick={onOpenHistory}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
          title="Assignment History"
        >
          <Info className="w-5 h-5" />
        </button>

        <button
          onClick={onOpenReminders}
          className={`flex items-center justify-center p-2 rounded-full transition-colors relative ${
            overdueCount > 0
              ? "text-red-400 bg-red-900/30 hover:bg-red-900/50"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
          title="Notifications"
        >
          {overdueCount > 0 ? (
            <AlertTriangle className="w-5 h-5" />
          ) : (
            <Bell className="w-5 h-5" />
          )}

          {overdueCount > 0 && (
            <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
          )}
        </button>
      </div>

      <button
        onClick={onOpenPayments}
        className="flex items-center px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-sm font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
      >
        <CreditCard className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline">Payments</span>
      </button>

      <button
        onClick={onOpenClientInfo}
        className="flex items-center px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-sm font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
      >
        <Phone className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline">Client Info</span>
      </button>

      <button
        onClick={onOpenAuditDates}
        className="flex items-center px-3 py-2 bg-accent border border-transparent rounded-md text-sm font-medium text-white hover:bg-accentHover transition-colors shadow-sm"
      >
        <CalendarDays className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline">Audit Dates</span>
      </button>
    </>
  );
};

import React, { useState, useMemo } from 'react';
import { Layout } from './components/Layout';
import { FolderGrid } from './components/FolderGrid';
import { FolderDetails } from './components/FolderDetails';
import { CYCLES, MOCK_PAYMENTS, MOCK_CLIENT, MOCK_AUDIT_DATES, MOCK_REMINDERS, MOCK_ASSIGNMENTS } from './constants';
import { PaymentModal } from './components/Modals/PaymentModal';
import { ClientInfoModal } from './components/Modals/ClientInfoModal';
import { AuditDatesModal } from './components/Modals/AuditDatesModal';
import { ReminderListModal } from './components/Modals/ReminderListModal';
import { UserHistoryModal } from './components/Modals/UserHistoryModal';
import { CreateFolderModal } from './components/Modals/CreateFolderModal';
import { CreditCard, Phone, CalendarDays, Bell, AlertTriangle, Info, FolderPlus } from 'lucide-react';
import { Folder, Reminder } from './types';

const App: React.FC = () => {
  // --- State ---
  const [cycles, setCycles] = useState(CYCLES); // Lifted state for cycles to allow modification
  const [currentCycleId, setCurrentCycleId] = useState(CYCLES[0].id);
  const [currentStageId, setCurrentStageId] = useState(CYCLES[0].stages[0].id);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  
  // Initialize reminders from Mock, but allow adding new ones in session
  const [reminders, setReminders] = useState<Reminder[]>(MOCK_REMINDERS);
  
  const [isPaymentOpen, setPaymentOpen] = useState(false);
  const [isClientOpen, setClientOpen] = useState(false);
  const [isDatesOpen, setDatesOpen] = useState(false);
  const [isReminderListOpen, setReminderListOpen] = useState(false);
  const [isHistoryOpen, setHistoryOpen] = useState(false);
  const [isCreateFolderOpen, setCreateFolderOpen] = useState(false);

  // --- Derived State ---
  const currentCycle = useMemo(() => 
    cycles.find(c => c.id === currentCycleId) || cycles[0]
  , [cycles, currentCycleId]);

  const currentStage = useMemo(() => 
    currentCycle.stages.find(s => s.id === currentStageId) || currentCycle.stages[0]
  , [currentCycle, currentStageId]);

  const overdueCount = reminders.filter(r => r.status === 'Overdue').length;

  // --- Handlers ---
  const handleCycleChange = (id: string) => {
    const newCycle = cycles.find(c => c.id === id);
    if (newCycle) {
      setCurrentCycleId(id);
      setCurrentStageId(newCycle.stages[0].id); // Reset to first stage of new cycle
      setSelectedFolder(null); // Reset folder view
    }
  };

  const handleStageChange = (id: string) => {
    setCurrentStageId(id);
    setSelectedFolder(null); // Go back to grid when changing stages
  };

  const handleAddReminder = (folderName: string, date: string, message: string) => {
      const newReminder: Reminder = {
          id: Math.random().toString(36),
          folderName,
          date,
          message,
          status: 'Pending'
      };
      setReminders(prev => [...prev, newReminder]);
  };

  const handleCreateFolder = (name: string) => {
      const newFolder: Folder = {
          id: Math.random().toString(36).substr(2, 9),
          name: name,
          fileCount: 0,
          status: 'pending',
          lastModified: new Date().toISOString().split('T')[0]
      };

      setCycles(prevCycles => prevCycles.map(cycle => {
          if (cycle.id === currentCycleId) {
              return {
                  ...cycle,
                  stages: cycle.stages.map(stage => {
                      if (stage.id === currentStageId) {
                          return {
                              ...stage,
                              folders: [...stage.folders, newFolder]
                          };
                      }
                      return stage;
                  })
              };
          }
          return cycle;
      }));
  };

  const handleDeleteFolder = (folderId: string) => {
      if(!window.confirm("Are you sure you want to delete this folder? This action cannot be undone.")) return;

      setCycles(prevCycles => prevCycles.map(cycle => {
          if (cycle.id === currentCycleId) {
              return {
                  ...cycle,
                  stages: cycle.stages.map(stage => {
                      if (stage.id === currentStageId) {
                          return {
                              ...stage,
                              folders: stage.folders.filter(f => f.id !== folderId)
                          };
                      }
                      return stage;
                  })
              };
          }
          return cycle;
      }));
  };

  const CycleSelector = () => (
    <div className="relative inline-block text-left w-full sm:w-auto">
        <label className="block text-xs text-slate-500 font-semibold uppercase mb-1 sm:hidden">Select Cycle</label>
        <div className="flex bg-slate-100 rounded-lg p-1">
            {cycles.map(cycle => (
                <button
                    key={cycle.id}
                    onClick={() => handleCycleChange(cycle.id)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                        currentCycleId === cycle.id
                        ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                >
                    {cycle.name}
                </button>
            ))}
        </div>
    </div>
  );

  const HeaderActions = () => (
    <>
      <div className="flex items-center space-x-2 mr-2 border-r border-slate-800 pr-4">
        {/* Info / History Button */}
        <button
            onClick={() => setHistoryOpen(true)}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
            title="Assignment History"
        >
            <Info className="w-5 h-5" />
        </button>

        {/* Reminders Button */}
        <button 
            onClick={() => setReminderListOpen(true)}
            className={`flex items-center justify-center p-2 rounded-full transition-colors relative ${
                overdueCount > 0 
                ? 'text-red-400 bg-red-900/30 hover:bg-red-900/50' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Notifications"
        >
            {overdueCount > 0 ? <AlertTriangle className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
            {overdueCount > 0 && (
                <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                </span>
            )}
        </button>
      </div>

      <button 
        onClick={() => setPaymentOpen(true)}
        className="flex items-center px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-sm font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
      >
        <CreditCard className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline">Payments</span>
      </button>

      <button 
        onClick={() => setClientOpen(true)}
        className="flex items-center px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-sm font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
      >
        <Phone className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline">Client Info</span>
      </button>

      <button 
        onClick={() => setDatesOpen(true)}
        className="flex items-center px-3 py-2 bg-accent border border-transparent rounded-md text-sm font-medium text-white hover:bg-accentHover transition-colors shadow-sm"
      >
        <CalendarDays className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline">Audit Dates</span>
      </button>
    </>
  );

  return (
    <>
      <Layout
        cycles={cycles}
        currentCycleId={currentCycleId}
        currentStageId={currentStageId}
        onCycleChange={handleCycleChange}
        onStageChange={handleStageChange}
        cycleSelector={<CycleSelector />}
        headerActions={<HeaderActions />}
      >
          {!selectedFolder ? (
            // Grid View
            <div className="animate-fadeIn">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">{currentStage.name}</h1>
                        <p className="mt-1 text-sm text-slate-500">Select a folder to manage documents.</p>
                    </div>
                    <button 
                        onClick={() => setCreateFolderOpen(true)}
                        className="flex items-center justify-center px-4 py-2.5 bg-accent text-white rounded-lg hover:bg-accentHover font-medium shadow-sm transition-colors"
                    >
                        <FolderPlus className="w-5 h-5 mr-2" />
                        Create New Folder
                    </button>
                </div>
                <FolderGrid 
                    folders={currentStage.folders} 
                    onFolderClick={(folder) => setSelectedFolder(folder)}
                    reminders={reminders}
                    onAddReminder={handleAddReminder}
                    onDeleteFolder={handleDeleteFolder}
                />
            </div>
          ) : (
            // Detail View
            <FolderDetails 
                folder={selectedFolder} 
                onBack={() => setSelectedFolder(null)} 
            />
          )}
      </Layout>

      {/* Global Modals */}
      <CreateFolderModal
        isOpen={isCreateFolderOpen}
        onClose={() => setCreateFolderOpen(false)}
        onCreate={handleCreateFolder}
      />

      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setPaymentOpen(false)} 
        payments={MOCK_PAYMENTS} 
      />
      
      <ClientInfoModal 
        isOpen={isClientOpen} 
        onClose={() => setClientOpen(false)} 
        data={MOCK_CLIENT} 
      />

      <AuditDatesModal 
        isOpen={isDatesOpen} 
        onClose={() => setDatesOpen(false)} 
        dates={MOCK_AUDIT_DATES} 
      />

      <ReminderListModal
        isOpen={isReminderListOpen}
        onClose={() => setReminderListOpen(false)}
        reminders={reminders}
      />

      <UserHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setHistoryOpen(false)}
        assignments={MOCK_ASSIGNMENTS}
      />
    </>
  );
};

export default App;
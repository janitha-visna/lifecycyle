import React, { useState, useMemo } from "react";
import { Layout } from "./components/Layout";
import { FolderGrid } from "./components/FolderGrid";
import { FolderDetails } from "./components/FolderDetails";
import { HeaderActions } from "./components/com/HeaderActions";
import { CycleSelector } from "./components/com/CycleSelector";

import {
  CYCLES,
  MOCK_PAYMENTS,
  MOCK_CLIENT,
  MOCK_AUDIT_DATES,
  MOCK_REMINDERS,
  MOCK_ASSIGNMENTS,
} from "./constants";

import { PaymentModal } from "./components/Modals/PaymentModal";
import { ClientInfoModal } from "./components/Modals/ClientInfoModal";
import { AuditDatesModal } from "./components/Modals/AuditDatesModal";
import { ReminderListModal } from "./components/Modals/ReminderListModal";
import { UserHistoryModal } from "./components/Modals/UserHistoryModal";
import { CreateFolderModal } from "./components/Modals/CreateFolderModal";

import { FolderPlus } from "lucide-react";
import { Folder, Reminder } from "./types";

const App: React.FC = () => {
  const [cycles, setCycles] = useState(CYCLES);
  const [currentCycleId, setCurrentCycleId] = useState(CYCLES[0].id);
  const [currentStageId, setCurrentStageId] = useState(CYCLES[0].stages[0].id);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);

  const [reminders, setReminders] = useState<Reminder[]>(MOCK_REMINDERS);

  const [isPaymentOpen, setPaymentOpen] = useState(false);
  const [isClientOpen, setClientOpen] = useState(false);
  const [isDatesOpen, setDatesOpen] = useState(false);
  const [isReminderListOpen, setReminderListOpen] = useState(false);
  const [isHistoryOpen, setHistoryOpen] = useState(false);
  const [isCreateFolderOpen, setCreateFolderOpen] = useState(false);

  const currentCycle = useMemo(
    () => cycles.find((c) => c.id === currentCycleId) || cycles[0],
    [cycles, currentCycleId]
  );

  const currentStage = useMemo(
    () =>
      currentCycle.stages.find((s) => s.id === currentStageId) ||
      currentCycle.stages[0],
    [currentCycle, currentStageId]
  );

  const overdueCount = reminders.filter((r) => r.status === "Overdue").length;

  const handleCycleChange = (id: string) => {
    const newCycle = cycles.find((c) => c.id === id);

    if (newCycle) {
      setCurrentCycleId(id);
      setCurrentStageId(newCycle.stages[0].id);
      setSelectedFolder(null);
    }
  };

  const handleStageChange = (id: string) => {
    setCurrentStageId(id);
    setSelectedFolder(null);
  };

  const handleAddReminder = (
    folderName: string,
    date: string,
    message: string
  ) => {
    const newReminder: Reminder = {
      id: Math.random().toString(36),
      folderName,
      date,
      message,
      status: "Pending",
    };

    setReminders((prev) => [...prev, newReminder]);
  };

  const handleCreateFolder = (name: string) => {
    const newFolder: Folder = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      fileCount: 0,
      status: "pending",
      lastModified: new Date().toISOString().split("T")[0],
    };

    setCycles((prevCycles) =>
      prevCycles.map((cycle) => {
        if (cycle.id === currentCycleId) {
          return {
            ...cycle,
            stages: cycle.stages.map((stage) => {
              if (stage.id === currentStageId) {
                return {
                  ...stage,
                  folders: [...stage.folders, newFolder],
                };
              }

              return stage;
            }),
          };
        }

        return cycle;
      })
    );
  };

  const handleDeleteFolder = (folderId: string) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this folder? This action cannot be undone."
      )
    ) {
      return;
    }

    setCycles((prevCycles) =>
      prevCycles.map((cycle) => {
        if (cycle.id === currentCycleId) {
          return {
            ...cycle,
            stages: cycle.stages.map((stage) => {
              if (stage.id === currentStageId) {
                return {
                  ...stage,
                  folders: stage.folders.filter((f) => f.id !== folderId),
                };
              }

              return stage;
            }),
          };
        }

        return cycle;
      })
    );
  };

  return (
    <>
      <Layout
        cycles={cycles}
        currentCycleId={currentCycleId}
        currentStageId={currentStageId}
        onCycleChange={handleCycleChange}
        onStageChange={handleStageChange}
        cycleSelector={
          <CycleSelector
            cycles={cycles}
            currentCycleId={currentCycleId}
            onCycleChange={handleCycleChange}
          />
        }
        headerActions={
          <HeaderActions
            overdueCount={overdueCount}
            onOpenHistory={() => setHistoryOpen(true)}
            onOpenReminders={() => setReminderListOpen(true)}
            onOpenPayments={() => setPaymentOpen(true)}
            onOpenClientInfo={() => setClientOpen(true)}
            onOpenAuditDates={() => setDatesOpen(true)}
          />
        }
      >
        {!selectedFolder ? (
          <div className="animate-fadeIn">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {currentStage.name}
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Select a folder to manage documents.
                </p>
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
          <FolderDetails
            folder={selectedFolder}
            onBack={() => setSelectedFolder(null)}
          />
        )}
      </Layout>

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

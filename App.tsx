import React from "react";
import { Layout } from "./components/Layout";
import { FolderGrid } from "./components/FolderGrid";
import { FolderDetails } from "./components/FolderDetails";
import { HeaderActions } from "./components/com/HeaderActions";
import { CycleSelector } from "./components/com/CycleSelector";
import { AppModals } from "./components/com/AppModals";
import { useModalState } from "./hooks/useModalState";

import { FolderPlus } from "lucide-react";
import { CYCLES, MOCK_REMINDERS } from "./constants";
import { Folder, Reminder } from "./types";

const App: React.FC = () => {
  const [cycles, setCycles] = React.useState(CYCLES);
  const [currentCycleId, setCurrentCycleId] = React.useState(CYCLES[0].id);
  const [currentStageId, setCurrentStageId] = React.useState(
    CYCLES[0].stages[0].id
  );
  const [selectedFolder, setSelectedFolder] = React.useState<Folder | null>(
    null
  );
  const [reminders, setReminders] = React.useState<Reminder[]>(MOCK_REMINDERS);

  const { modals, openModal, closeModal } = useModalState();

  const currentCycle = React.useMemo(
    () => cycles.find((c) => c.id === currentCycleId) || cycles[0],
    [cycles, currentCycleId]
  );

  const currentStage = React.useMemo(
    () =>
      currentCycle.stages.find((s) => s.id === currentStageId) ||
      currentCycle.stages[0],
    [currentCycle, currentStageId]
  );

  const overdueCount = reminders.filter((r) => r.status === "Overdue").length;

  const handleCycleChange = (id: string) => {
    const newCycle = cycles.find((c) => c.id === id);

    if (!newCycle) return;

    setCurrentCycleId(id);
    setCurrentStageId(newCycle.stages[0].id);
    setSelectedFolder(null);
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
      prevCycles.map((cycle) =>
        cycle.id === currentCycleId
          ? {
              ...cycle,
              stages: cycle.stages.map((stage) =>
                stage.id === currentStageId
                  ? { ...stage, folders: [...stage.folders, newFolder] }
                  : stage
              ),
            }
          : cycle
      )
    );
  };

  const handleDeleteFolder = (folderId: string) => {
    if (!window.confirm("Are you sure you want to delete this folder?")) return;

    setCycles((prevCycles) =>
      prevCycles.map((cycle) =>
        cycle.id === currentCycleId
          ? {
              ...cycle,
              stages: cycle.stages.map((stage) =>
                stage.id === currentStageId
                  ? {
                      ...stage,
                      folders: stage.folders.filter((f) => f.id !== folderId),
                    }
                  : stage
              ),
            }
          : cycle
      )
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
            onOpenHistory={() => openModal("history")}
            onOpenReminders={() => openModal("reminderList")}
            onOpenPayments={() => openModal("payment")}
            onOpenClientInfo={() => openModal("client")}
            onOpenAuditDates={() => openModal("dates")}
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
                onClick={() => openModal("createFolder")}
                className="flex items-center justify-center px-4 py-2.5 bg-accent text-white rounded-lg hover:bg-accentHover font-medium shadow-sm transition-colors"
              >
                <FolderPlus className="w-5 h-5 mr-2" />
                Create New Folder
              </button>
            </div>

            <FolderGrid
              folders={currentStage.folders}
              onFolderClick={setSelectedFolder}
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

      <AppModals
        modals={modals}
        closeModal={closeModal}
        reminders={reminders}
        onCreateFolder={handleCreateFolder}
      />
    </>
  );
};

export default App;

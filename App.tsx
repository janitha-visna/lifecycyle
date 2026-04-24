import React from "react";
import { Layout } from "./components/Layout";
import { FolderGrid } from "./components/FolderGrid";
import { FolderDetails } from "./components/FolderDetails";
import { HeaderActions } from "./components/com/HeaderActions";
import { CycleSelector } from "./components/com/CycleSelector";
import { AppModals } from "./components/com/AppModals";
import { useModalState } from "./hooks/useModalState";
import { useCertificationFlow } from "./hooks/useCertificationFlow";

import { FolderPlus } from "lucide-react";

const App: React.FC = () => {
  const { modals, openModal, closeModal } = useModalState();

  const {
    cycles,
    currentCycleId,
    currentStageId,
    currentStage,
    selectedFolder,
    setSelectedFolder,
    reminders,
    overdueCount,
    handleCycleChange,
    handleStageChange,
    handleAddReminder,
    handleCreateFolder,
    handleDeleteFolder,
  } = useCertificationFlow();

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

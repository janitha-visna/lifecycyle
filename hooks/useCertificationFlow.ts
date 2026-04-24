// hooks/useCertificationFlow.ts

import React from "react";
import { CYCLES, MOCK_REMINDERS } from "../constants";
import { Folder, Reminder } from "../types";

export function useCertificationFlow() {
  const [cycles, setCycles] = React.useState(CYCLES);
  const [currentCycleId, setCurrentCycleId] = React.useState(CYCLES[0].id);
  const [currentStageId, setCurrentStageId] = React.useState(
    CYCLES[0].stages[0].id
  );
  const [selectedFolder, setSelectedFolder] = React.useState<Folder | null>(
    null
  );
  const [reminders, setReminders] = React.useState<Reminder[]>(MOCK_REMINDERS);

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
                  ? {
                      ...stage,
                      folders: [...stage.folders, newFolder],
                    }
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

  return {
    cycles,
    currentCycleId,
    currentStageId,
    currentCycle,
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
  };
}

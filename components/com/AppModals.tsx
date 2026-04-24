// components/AppModals.tsx

import { PaymentModal } from "../Modals/PaymentModal";
import { ClientInfoModal } from "../Modals/ClientInfoModal";
import { AuditDatesModal } from "../Modals/AuditDatesModal";
import { ReminderListModal } from "../Modals/ReminderListModal";
import { UserHistoryModal } from "../Modals/UserHistoryModal";
import { CreateFolderModal } from "../Modals/CreateFolderModal";


import { MOCK_PAYMENTS,MOCK_CLIENT,MOCK_AUDIT_DATES,MOCK_ASSIGNMENTS,MOCK_REMINDERS } from "@/constants";

import { Reminder } from "@/types";
import { Import } from "lucide-react";

interface AppModalsProps {
  modals: {
    payment: boolean;
    client: boolean;
    dates: boolean;
    reminderList: boolean;
    history: boolean;
    createFolder: boolean;
  };
  closeModal: (name: keyof AppModalsProps["modals"]) => void;
  reminders: Reminder[];
  onCreateFolder: (name: string) => void;
}

export function AppModals({
  modals,
  closeModal,
  reminders,
  onCreateFolder,
}: AppModalsProps) {
  return (
    <>
      <CreateFolderModal
        isOpen={modals.createFolder}
        onClose={() => closeModal("createFolder")}
        onCreate={onCreateFolder}
      />

      <PaymentModal
        isOpen={modals.payment}
        onClose={() => closeModal("payment")}
        payments={MOCK_PAYMENTS}
      />

      <ClientInfoModal
        isOpen={modals.client}
        onClose={() => closeModal("client")}
        data={MOCK_CLIENT}
      />

      <AuditDatesModal
        isOpen={modals.dates}
        onClose={() => closeModal("dates")}
        dates={MOCK_AUDIT_DATES}
      />

      <ReminderListModal
        isOpen={modals.reminderList}
        onClose={() => closeModal("reminderList")}
        reminders={reminders}
      />

      <UserHistoryModal
        isOpen={modals.history}
        onClose={() => closeModal("history")}
        assignments={MOCK_ASSIGNMENTS}
      />
    </>
  );
}

// hooks/useModalState.ts

import { useState } from "react";

export type ModalName =
  | "payment"
  | "client"
  | "dates"
  | "reminderList"
  | "history"
  | "createFolder";

export function useModalState() {
  const [modals, setModals] = useState({
    payment: false,
    client: false,
    dates: false,
    reminderList: false,
    history: false,
    createFolder: false,
  });

  const openModal = (name: ModalName) => {
    setModals((prev) => ({ ...prev, [name]: true }));
  };

  const closeModal = (name: ModalName) => {
    setModals((prev) => ({ ...prev, [name]: false }));
  };

  return { modals, openModal, closeModal };
}

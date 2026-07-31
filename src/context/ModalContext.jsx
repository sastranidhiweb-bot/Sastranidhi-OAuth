import { createContext, useContext, useState, useCallback } from 'react';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [openModal, setOpenModal] = useState(null); // 'login' | 'signup' | 'donate' | null

  const open = useCallback((name) => setOpenModal(name), []);
  const close = useCallback(() => setOpenModal(null), []);

  return (
    <ModalContext.Provider value={{ openModal, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return ctx;
}

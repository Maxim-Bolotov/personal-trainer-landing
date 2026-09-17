import { useCallback, useMemo, useState } from 'react';
import BookingModalContext from './BookingModalContext';

/**
 * Глобальное состояние модалки записи. Живёт на уровне App, чтобы её мог
 * открыть любой CTA на странице (хедер, блок CTA, карточки программ) —
 * последние ещё и передают id программы, чтобы шаг 2 открылся с уже
 * выбранной программой.
 */
export function BookingModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState('');

  const openModal = useCallback((programId = '') => {
    setSelectedProgramId(programId);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, selectedProgramId, openModal, closeModal }),
    [isOpen, selectedProgramId, openModal, closeModal]
  );

  return <BookingModalContext.Provider value={value}>{children}</BookingModalContext.Provider>;
}

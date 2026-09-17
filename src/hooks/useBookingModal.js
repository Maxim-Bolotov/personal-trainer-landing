import { useContext } from 'react';
import BookingModalContext from '../context/BookingModalContext';

export function useBookingModal() {
  const ctx = useContext(BookingModalContext);
  if (!ctx) {
    throw new Error('useBookingModal должен использоваться внутри BookingModalProvider');
  }
  return ctx;
}

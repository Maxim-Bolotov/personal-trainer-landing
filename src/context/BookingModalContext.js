import { createContext } from 'react';

/**
 * Вынесен в отдельный файл (не .jsx), чтобы Provider-компонент и хук
 * useBookingModal могли лежать каждый в своём файле — иначе oxlint ругается
 * на "only-export-components" (файл компонента должен экспортировать
 * только компоненты для корректной работы Fast Refresh).
 */
const BookingModalContext = createContext(null);

export default BookingModalContext;

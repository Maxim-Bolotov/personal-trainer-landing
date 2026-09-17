import styles from './BookingModal.module.css';

function LoadingState() {
  return (
    <div className={styles.stateBlock} aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <p className={styles.stateTitle}>Отправляем заявку…</p>
      <p className={styles.stateText}>Это займёт пару секунд</p>
    </div>
  );
}

export default LoadingState;

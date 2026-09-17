import Button from '../../ui/Button';
import styles from './BookingModal.module.css';

function ThanksState({ name, onClose }) {
  return (
    <div className={styles.stateBlock}>
      <span className={styles.checkIcon} aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 12.5L9.5 18L20 6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <p className={styles.stateTitle}>{name ? `Спасибо, ${name}!` : 'Спасибо за заявку!'}</p>
      <p className={styles.stateText}>
        Мы получили вашу заявку — тренер свяжется с вами в ближайшее время.
      </p>
      <Button type="button" variant="primary" size="md" onClick={onClose} className={styles.stateButton}>
        Закрыть
      </Button>
    </div>
  );
}

export default ThanksState;

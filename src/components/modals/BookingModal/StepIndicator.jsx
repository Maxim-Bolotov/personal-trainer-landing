import styles from './BookingModal.module.css';

const STEP_LABELS = ['О вас', 'Программа', 'Контакты'];

function StepIndicator({ step }) {
  return (
    <div className={styles.indicator}>
      <div className={styles.indicatorTrack}>
        {STEP_LABELS.map((label, index) => {
          const stepNumber = index + 1;
          const state =
            stepNumber === step ? 'active' : stepNumber < step ? 'done' : 'upcoming';

          return (
            <div key={label} className={styles.indicatorItem}>
              <span className={`${styles.indicatorDot} ${styles[`dot-${state}`]}`}>
                {stepNumber < step ? '✓' : stepNumber}
              </span>
              <span className={styles.indicatorLabel}>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StepIndicator;

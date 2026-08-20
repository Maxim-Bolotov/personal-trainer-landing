import { useId } from 'react';
import styles from './Faq.module.css';

/**
 * Один пункт аккордеона FAQ.
 * Управляется извне (controlled), чтобы гарантировать
 * только один открытый вопрос за раз.
 */
function FaqItem({ question, answer, isOpen, onToggle }) {
  const panelId = useId();

  return (
    <div className={styles.item}>
      <button
        type="button"
        className={styles.question}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span>{question}</span>
        <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`} aria-hidden="true">
          +
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        className={`${styles.answerWrapper} ${isOpen ? styles.answerOpen : ''}`}
      >
        <p className={styles.answer}>{answer}</p>
      </div>
    </div>
  );
}

export default FaqItem;

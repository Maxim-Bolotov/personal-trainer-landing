import styles from './Faq.module.css';

/**
 * @param {string} question
 * @param {string} answer
 * @param {boolean} isOpen
 * @param {() => void} onToggle
 */
function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className={styles.item}>
      <button
        type="button"
        className={styles.question}
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span>{question}</span>
        <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`} aria-hidden="true">
          &#8595;
        </span>
      </button>

      <div className={`${styles.answerWrapper} ${isOpen ? styles.answerOpen : ''}`}>
        <p className={styles.answer}>{answer}</p>
      </div>
    </div>
  );
}

export default FaqItem;

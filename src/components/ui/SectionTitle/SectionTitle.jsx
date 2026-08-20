import styles from './SectionTitle.module.css';

/**
 * @param {string} eyebrow - small label above the title (optional)
 * @param {string} title
 * @param {string} description - supporting paragraph (optional)
 * @param {'left' | 'center'} align
 */
function SectionTitle({ eyebrow, title, description, align = 'left', className = '' }) {
  const classes = [styles.wrapper, styles[align], className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}

export default SectionTitle;

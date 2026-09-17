import styles from './Steps.module.css';

/**
 * Обёртка поля формы: лейбл + слот под инпут + текст ошибки/подсказки.
 * Ошибка показывается только когда есть И error, И поле touched — эту
 * проверку делает вызывающий компонент, здесь просто рендерим то, что дали.
 */
function FormField({ label, htmlFor, error, hint, children }) {
  const classes = [styles.field, error ? styles.fieldInvalid : ''].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {error ? (
        <span className={styles.error} role="alert">
          {error}
        </span>
      ) : (
        hint && <span className={styles.hint}>{hint}</span>
      )}
    </div>
  );
}

export default FormField;

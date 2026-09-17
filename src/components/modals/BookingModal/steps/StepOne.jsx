import FormField from './FormField';
import styles from './Steps.module.css';

/**
 * Шаг 1 — анкета. healthNotes и noHealthIssues: ввод текста снимает
 * чекбокс (handleHealthText), но чекбокс НЕ стирает уже введённый текст —
 * он просто перестаёт учитываться в валидации/отправке, пока чекбокс
 * активен (см. validateHealth и telegram.js). Обязательны все поля, кроме
 * этой пары — там достаточно одного из двух.
 */
function StepOne({ data, errors, touched, onChange, onBlur }) {
  const handleHealthText = (e) => {
    const value = e.target.value;
    onChange('healthNotes', value);
    if (value.trim() && data.noHealthIssues) {
      onChange('noHealthIssues', false);
    }
  };

  const handleToggleNoHealth = () => {
    onChange('noHealthIssues', !data.noHealthIssues);
  };

  return (
    <div className={styles.step}>
      <FormField label="Имя" htmlFor="booking-name" error={touched.name && errors.name}>
        <input
          id="booking-name"
          type="text"
          className={styles.input}
          placeholder="Как вас зовут"
          autoComplete="name"
          value={data.name}
          onChange={(e) => onChange('name', e.target.value)}
          onBlur={() => onBlur('name')}
        />
      </FormField>

      <div className={styles.row}>
        <FormField label="Возраст" htmlFor="booking-age" error={touched.age && errors.age}>
          <input
            id="booking-age"
            type="number"
            inputMode="numeric"
            min="10"
            max="100"
            className={styles.input}
            placeholder="Лет"
            value={data.age}
            onChange={(e) => onChange('age', e.target.value)}
            onBlur={() => onBlur('age')}
          />
        </FormField>

        <FormField label="Вес, кг" htmlFor="booking-weight" error={touched.weight && errors.weight}>
          <input
            id="booking-weight"
            type="number"
            inputMode="decimal"
            min="20"
            max="300"
            step="0.1"
            className={styles.input}
            placeholder="Кг"
            value={data.weight}
            onChange={(e) => onChange('weight', e.target.value)}
            onBlur={() => onBlur('weight')}
          />
        </FormField>

        <FormField label="Рост, см" htmlFor="booking-height" error={touched.height && errors.height}>
          <input
            id="booking-height"
            type="number"
            inputMode="numeric"
            min="100"
            max="250"
            className={styles.input}
            placeholder="См"
            value={data.height}
            onChange={(e) => onChange('height', e.target.value)}
            onBlur={() => onBlur('height')}
          />
        </FormField>
      </div>

      <FormField
        label="Ограничения по здоровью, травмы"
        htmlFor="booking-health"
        error={touched.healthNotes && errors.healthNotes}
      >
        <textarea
          id="booking-health"
          className={styles.textarea}
          rows={3}
          placeholder="Опишите, если есть — или отметьте галочку ниже"
          value={data.healthNotes}
          disabled={data.noHealthIssues}
          onChange={handleHealthText}
          onBlur={() => onBlur('healthNotes')}
        />
        <label className={styles.checkboxRow} htmlFor="booking-no-health">
          <input
            id="booking-no-health"
            type="checkbox"
            className={styles.checkbox}
            checked={data.noHealthIssues}
            onChange={handleToggleNoHealth}
            onBlur={() => onBlur('healthNotes')}
          />
          <span className={styles.checkboxLabel}>Нет ограничений и травм</span>
        </label>
      </FormField>
    </div>
  );
}

export default StepOne;

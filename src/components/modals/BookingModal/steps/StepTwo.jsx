import FormField from './FormField';
import CustomSelect from './CustomSelect';
import styles from './Steps.module.css';
import { programs } from '../../../../data/programs';
import { formatPrice } from '../../../../utils/formatPrice';

const PROGRAM_OPTIONS = programs.map((program) => ({
  value: program.id,
  label: `${program.title} — ${formatPrice(program.price)}/${program.period}`,
}));

/**
 * Шаг 2 — программа и желаемый результат. Если модалка открыта с карточки
 * конкретной программы (Programs.jsx), data.programId уже проставлен
 * родителем — здесь просто рендерим select с этим значением.
 */
function StepTwo({ data, errors, touched, onChange, onBlur }) {
  return (
    <div className={styles.step}>
      <FormField label="Программа" htmlFor="booking-program" error={touched.programId && errors.programId}>
        <CustomSelect
          id="booking-program"
          value={data.programId}
          onChange={(value) => onChange('programId', value)}
          onBlur={() => onBlur('programId')}
          placeholder="Выберите программу"
          options={PROGRAM_OPTIONS}
        />
      </FormField>

      <FormField
        label="Желаемый результат"
        htmlFor="booking-result"
        error={touched.desiredResult && errors.desiredResult}
      >
        <textarea
          id="booking-result"
          className={styles.textarea}
          rows={4}
          placeholder="Например: снизить вес на 8 кг за 3 месяца, подготовиться к соревнованиям..."
          value={data.desiredResult}
          onChange={(e) => onChange('desiredResult', e.target.value)}
          onBlur={() => onBlur('desiredResult')}
        />
      </FormField>
    </div>
  );
}

export default StepTwo;

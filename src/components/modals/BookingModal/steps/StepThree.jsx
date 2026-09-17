import { useRef } from 'react';
import FormField from './FormField';
import styles from './Steps.module.css';
import { formatPhoneValue, countDigitsAfter, caretPositionFromDigitsAfter } from '../phoneMask';

/**
 * Шаг 3 — контакты. Все 4 поля опциональны по отдельности (валидируются,
 * только если заполнены), но хотя бы одно должно быть заполнено — общая
 * ошибка errors.general рендерится не здесь, а в BookingModal.jsx (см.
 * комментарий там про overflow скроллящегося контейнера).
 */
function StepThree({ data, errors, touched, onChange, onBlur }) {
  const phoneRef = useRef(null);

  // Форматируем номер по маске +7 (XXX) XXX-XX-XX на каждый ввод — в том
  // числе на вставку через copy-paste, т.к. paste тоже приходит сюда через
  // обычный onChange. Курсор восстанавливаем по числу цифр справа от него,
  // чтобы не улетал в конец поля при правке середины номера.
  const handlePhoneChange = (e) => {
    const input = e.target;
    const caret = input.selectionStart ?? input.value.length;
    const digitsAfter = countDigitsAfter(input.value, caret);
    const formatted = formatPhoneValue(input.value);

    onChange('phone', formatted);

    requestAnimationFrame(() => {
      if (!phoneRef.current) return;
      const pos = caretPositionFromDigitsAfter(formatted, digitsAfter);
      phoneRef.current.setSelectionRange(pos, pos);
    });
  };

  return (
    <div className={styles.step}>
      <FormField label="Телефон" htmlFor="booking-phone" error={touched.phone && errors.phone}>
        <input
          id="booking-phone"
          ref={phoneRef}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          className={styles.input}
          placeholder="+7 (900) 000-00-00"
          value={data.phone}
          onChange={handlePhoneChange}
          onBlur={() => onBlur('phone')}
        />
      </FormField>

      <FormField label="Email" htmlFor="booking-email" error={touched.email && errors.email}>
        <input
          id="booking-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          className={styles.input}
          placeholder="mail@example.com"
          value={data.email}
          onChange={(e) => onChange('email', e.target.value)}
          onBlur={() => onBlur('email')}
        />
      </FormField>

      <FormField label="Telegram" htmlFor="booking-telegram" error={touched.telegram && errors.telegram}>
        <input
          id="booking-telegram"
          type="text"
          className={styles.input}
          placeholder="@username"
          value={data.telegram}
          onChange={(e) => onChange('telegram', e.target.value)}
          onBlur={() => onBlur('telegram')}
        />
      </FormField>

      <FormField label="Max" htmlFor="booking-max" error={touched.max && errors.max}>
        <input
          id="booking-max"
          type="text"
          className={styles.input}
          placeholder="Ваш контакт в Max"
          value={data.max}
          onChange={(e) => onChange('max', e.target.value)}
          onBlur={() => onBlur('max')}
        />
      </FormField>
    </div>
  );
}

export default StepThree;

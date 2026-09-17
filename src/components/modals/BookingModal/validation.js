/**
 * Валидация формы записи. Каждый validate* для одиночного поля возвращает
 * текст ошибки на русском или пустую строку, если всё в порядке.
 * validateStepOne/Two/Three агрегируют их в объект { field: 'ошибка' } —
 * поле в объекте отсутствует, если оно валидно.
 */

const NAME_REGEX = /^[A-Za-zА-Яа-яЁё\s-]{2,60}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEGRAM_REGEX = /^@?[A-Za-z0-9_]{5,32}$/;
const PHONE_DIGITS_REGEX = /^7\d{10}$/;

export function validateName(value) {
  const v = value.trim();
  if (!v) return 'Введите имя';
  if (!NAME_REGEX.test(v)) return 'Имя: от 2 до 60 букв, без цифр и спецсимволов';
  return '';
}

export function validateAge(value) {
  if (value === '') return 'Введите возраст';
  const n = Number(value);
  if (!Number.isFinite(n)) return 'Возраст должен быть числом';
  if (n < 10 || n > 100) return 'Возраст: от 10 до 100 лет';
  return '';
}

export function validateWeight(value) {
  if (value === '') return 'Введите вес';
  const n = Number(value);
  if (!Number.isFinite(n)) return 'Вес должен быть числом';
  if (n < 20 || n > 300) return 'Вес: от 20 до 300 кг';
  return '';
}

export function validateHeight(value) {
  if (value === '') return 'Введите рост';
  const n = Number(value);
  if (!Number.isFinite(n)) return 'Рост должен быть числом';
  if (n < 100 || n > 250) return 'Рост: от 100 до 250 см';
  return '';
}

export function validateHealth(healthNotes, noHealthIssues) {
  if (noHealthIssues) return '';
  if (healthNotes.trim()) return '';
  return 'Опишите ограничения/травмы или отметьте чекбокс';
}

export function validateProgram(value) {
  return value ? '' : 'Выберите программу';
}

export function validateDesiredResult(value) {
  const v = value.trim();
  if (!v) return 'Опишите желаемый результат';
  if (v.length < 5) return 'Опишите желаемый результат чуть подробнее';
  return '';
}

export function validatePhone(value) {
  const v = value.trim();
  if (!v) return '';
  const digits = v.replace(/\D/g, '');
  if (!PHONE_DIGITS_REGEX.test(digits)) return 'Введите корректный номер телефона';
  return '';
}

export function validateEmail(value) {
  const v = value.trim();
  if (!v) return '';
  if (!EMAIL_REGEX.test(v)) return 'Введите корректный email';
  return '';
}

export function validateTelegram(value) {
  const v = value.trim();
  if (!v) return '';
  if (!TELEGRAM_REGEX.test(v)) return 'Введите корректный username, например @ivanov';
  return '';
}

export function validateMax(value) {
  const v = value.trim();
  if (!v) return '';
  if (v.length < 2 || v.length > 50) return 'Введите корректные данные Max';
  return '';
}

export function validateStepOne(data) {
  const errors = {};
  const name = validateName(data.name);
  const age = validateAge(data.age);
  const weight = validateWeight(data.weight);
  const height = validateHeight(data.height);
  const health = validateHealth(data.healthNotes, data.noHealthIssues);

  if (name) errors.name = name;
  if (age) errors.age = age;
  if (weight) errors.weight = weight;
  if (height) errors.height = height;
  if (health) errors.healthNotes = health;

  return errors;
}

export function validateStepTwo(data) {
  const errors = {};
  const program = validateProgram(data.programId);
  const result = validateDesiredResult(data.desiredResult);

  if (program) errors.programId = program;
  if (result) errors.desiredResult = result;

  return errors;
}

export function validateStepThree(data) {
  const errors = {};
  const phone = validatePhone(data.phone);
  const email = validateEmail(data.email);
  const telegram = validateTelegram(data.telegram);
  const max = validateMax(data.max);

  if (phone) errors.phone = phone;
  if (email) errors.email = email;
  if (telegram) errors.telegram = telegram;
  if (max) errors.max = max;

  const hasAny = [data.phone, data.email, data.telegram, data.max].some((v) => v.trim());
  if (!hasAny) {
    errors.general = 'Заполните хотя бы один способ связи';
  }

  return errors;
}

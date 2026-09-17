/**
 * Маска российского номера телефона: +7 (XXX) XXX-XX-XX.
 *
 * formatPhoneValue принимает «сырое» значение инпута (в любом виде — то,
 * что уже было плюс то, что пользователь только что напечатал или
 * вставил через copy-paste: 89991234567 / +7 999 123 45 67 / 9991234567
 * и т.д.) и приводит его к единому формату по мере набора. 8 в начале
 * заменяется на 7, если кода страны нет вообще — он подставляется сам.
 *
 * caretPositionFromDigitsAfter/countDigitsAfter — восстановление позиции
 * курсора после переформатирования: считаем, сколько ЦИФР было справа от
 * курсора в старом значении, и ставим курсор так, чтобы после него
 * осталось столько же цифр в новой (отформатированной) строке. Это не
 * ломается на добавлении «+7» в начале при первом вводе, в отличие от
 * подсчёта цифр слева от курсора.
 */
export function formatPhoneValue(rawInput) {
  let digits = rawInput.replace(/\D/g, '');
  if (!digits) return '';

  if (digits.startsWith('8')) {
    digits = `7${digits.slice(1)}`;
  } else if (!digits.startsWith('7')) {
    digits = `7${digits}`;
  }
  digits = digits.slice(0, 11);

  const rest = digits.slice(1);
  let result = '+7';
  if (rest.length > 0) result += ` (${rest.slice(0, 3)}`;
  if (rest.length >= 3) result += ')';
  if (rest.length > 3) result += ` ${rest.slice(3, 6)}`;
  if (rest.length > 6) result += `-${rest.slice(6, 8)}`;
  if (rest.length > 8) result += `-${rest.slice(8, 10)}`;
  return result;
}

export function countDigitsAfter(value, caretIndex) {
  return value.slice(caretIndex).replace(/\D/g, '').length;
}

export function caretPositionFromDigitsAfter(formatted, digitsAfterCount) {
  if (digitsAfterCount <= 0) return formatted.length;

  const digitIndexes = [];
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i])) digitIndexes.push(i);
  }

  const targetIndex = digitIndexes.length - digitsAfterCount;
  if (targetIndex < 0) return 0;
  return digitIndexes[targetIndex];
}

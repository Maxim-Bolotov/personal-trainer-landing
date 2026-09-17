/**
 * Форматирует цену в рублях: классический знак ₽ и разрядные пробелы
 * (Intl.NumberFormat, локаль ru-RU), например 16900 -> "16 900 ₽".
 */
export function formatPrice(value) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value);
}

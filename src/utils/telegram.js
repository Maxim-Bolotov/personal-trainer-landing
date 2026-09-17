/**
 * Отправка заявки в Telegram-бот тренера через Bot API — напрямую из
 * браузера, без бэкенда (см. README, раздел "Telegram-бот").
 *
 * Важно: токен бота попадает через Vite env в собранный JS-бандл и виден
 * в DevTools любому, кто его откроет. Для лендинга с одним получателем
 * (лично тренер) это обычно приемлемый компромисс, но технически токен
 * может быть использован кем угодно для отправки сообщений через этого
 * бота. Если это критично — нужен небольшой серверный прокси (например,
 * Cloudflare Worker) вместо прямого вызова из браузера.
 */
const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[char]));
}

function formatLeadMessage(lead) {
  const lines = [
    '<b>Новая заявка с лендинга</b>',
    '',
    `<b>Имя:</b> ${escapeHtml(lead.name)}`,
    `<b>Возраст:</b> ${escapeHtml(lead.age)}`,
    `<b>Вес:</b> ${escapeHtml(lead.weight)} кг`,
    `<b>Рост:</b> ${escapeHtml(lead.height)} см`,
    `<b>Ограничения/травмы:</b> ${lead.noHealthIssues ? 'нет' : escapeHtml(lead.healthNotes)}`,
    '',
    `<b>Программа:</b> ${escapeHtml(lead.programTitle)}`,
    `<b>Желаемый результат:</b> ${escapeHtml(lead.desiredResult)}`,
    '',
    '<b>Контакты:</b>',
  ];

  if (lead.phone) lines.push(`Телефон: ${escapeHtml(lead.phone)}`);
  if (lead.email) lines.push(`Email: ${escapeHtml(lead.email)}`);
  if (lead.telegram) lines.push(`Telegram: ${escapeHtml(lead.telegram)}`);
  if (lead.max) lines.push(`Max: ${escapeHtml(lead.max)}`);

  return lines.join('\n');
}

/**
 * @param {object} lead - объединённые данные всех трёх шагов формы
 * @returns {Promise<{ok: boolean, reason?: string}>}
 */
export async function sendLeadToTelegram(lead) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn(
      '[telegram] VITE_TELEGRAM_BOT_TOKEN / VITE_TELEGRAM_CHAT_ID не заданы — заявка не отправлена. См. .env.example.'
    );
    return { ok: false, reason: 'not-configured' };
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: formatLeadMessage(lead),
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      console.error('[telegram] sendMessage вернул ошибку:', response.status, await response.text());
      return { ok: false, reason: 'http-error' };
    }

    return { ok: true };
  } catch (error) {
    console.error('[telegram] не удалось отправить заявку:', error);
    return { ok: false, reason: 'network-error' };
  }
}

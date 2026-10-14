import { useEffect, useRef } from "react";
import styles from "./ChatDialog.module.css";

/**
 * Модальное окно со скриншотом переписки. Нативный <dialog>: фокус-трап, Esc и
 * возврат фокуса на кнопку-открывашку работают из коробки.
 *
 * @param {string | null} src - путь к скриншоту; null — диалог закрыт
 * @param {() => void} onClose
 */
function ChatDialog({ src, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (src && !dialog.open) dialog.showModal();
    if (!src && dialog.open) dialog.close();
  }, [src]);

  // Пока диалог открыт — страница под ним не скроллится (так же, как в BookingModal)
  useEffect(() => {
    if (!src) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [src]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label="Переписка клиента с тренером"
      // Esc закрывает диалог нативно и шлёт close — синхронизируем состояние
      onClose={onClose}
      // Клик по подложке (::backdrop) приходит с target === сам <dialog>
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Закрыть"
      >
        ✕
      </button>
      {src && (
        <img
          key={src}
          src={src}
          alt="Скриншот переписки клиента с тренером"
          className={styles.image}
        />
      )}
    </dialog>
  );
}

export default ChatDialog;

import { useEffect, useRef, useState } from 'react';
import styles from './Steps.module.css';

/**
 * Свой выпадающий список вместо нативного <select> — браузер не даёт
 * стилизовать сам попап нативного селекта (список опций рендерится ОС и
 * игнорирует наши тёмные токены), поэтому рисуем список сами: кнопка +
 * абсолютно позиционированная панель с role="listbox".
 *
 * @param {string} id
 * @param {string} value
 * @param {(value: string) => void} onChange
 * @param {() => void} [onBlur]
 * @param {string} placeholder
 * @param {{value: string, label: string}[]} options
 */
function CustomSelect({ id, value, onChange, onBlur, placeholder, options }) {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const rootRef = useRef(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return undefined;
    const handleMouseDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [open]);

  const openMenu = () => {
    const currentIndex = options.findIndex((option) => option.value === value);
    setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
    setOpen(true);
  };

  const closeMenu = () => setOpen(false);

  const selectOption = (option) => {
    onChange(option.value);
    closeMenu();
  };

  const handleTriggerKeyDown = (e) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openMenu();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((i) => Math.min(options.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (highlightedIndex >= 0) selectOption(options[highlightedIndex]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      closeMenu();
    }
  };

  // Закрываем и сообщаем родителю о blur, когда фокус уходит за пределы
  // всего блока (клик по другому полю, Tab) — но не когда переходит
  // с кнопки на пункт списка внутри той же обёртки.
  const handleBlur = (e) => {
    if (!rootRef.current || !rootRef.current.contains(e.relatedTarget)) {
      setOpen(false);
      onBlur?.();
    }
  };

  return (
    <div className={styles.customSelect} ref={rootRef} onBlur={handleBlur}>
      <button
        type="button"
        id={id}
        className={`${styles.select} ${styles.selectTrigger}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={handleTriggerKeyDown}
      >
        <span className={selectedOption ? styles.selectValue : styles.selectPlaceholder}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={styles.selectChevron} aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <ul
          className={styles.selectMenu}
          role="listbox"
          aria-labelledby={id}
          // Клик по не-фокусируемому <li> иначе сначала блюрит кнопку
          // (mousedown -> blur), меню закрывается по onBlur ДО события
          // click — и выбор не срабатывает. preventDefault на mousedown
          // не даёт фокусу уйти с кнопки, так что click доходит нормально.
          onMouseDown={(e) => e.preventDefault()}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={[
                styles.selectOption,
                index === highlightedIndex ? styles.selectOptionHighlighted : '',
                option.value === value ? styles.selectOptionSelected : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onMouseEnter={() => setHighlightedIndex(index)}
              onClick={() => selectOption(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomSelect;

import { useCallback, useState } from 'react';

/**
 * Простой хук для управления индексом карусели.
 * Не привязан к разметке — можно переиспользовать для любых слайдеров.
 *
 * @param {number} length - количество слайдов
 */
export function useCarousel(length) {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((current) => (current + 1) % length);
  }, [length]);

  const prev = useCallback(() => {
    setIndex((current) => (current - 1 + length) % length);
  }, [length]);

  const goTo = useCallback(
    (targetIndex) => {
      if (targetIndex >= 0 && targetIndex < length) {
        setIndex(targetIndex);
      }
    },
    [length]
  );

  return { index, next, prev, goTo };
}

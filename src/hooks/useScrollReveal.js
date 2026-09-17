import { useEffect, useRef, useState } from 'react';

/**
 * Отслеживает пересечение элемента (обычно секции) с вьюпортом через
 * IntersectionObserver. isVisible становится true при входе элемента в
 * зону видимости и возвращается обратно в false при выходе — благодаря
 * этому reveal-анимация, завязанная на isVisible, проигрывается заново
 * при каждом повторном скролле к блоку.
 *
 * @param {Object} [options]
 * @param {number} [options.threshold=0.3] - какая доля элемента должна быть видна для срабатывания
 * @param {string} [options.rootMargin='0px'] - смещение зоны срабатывания (см. IntersectionObserver)
 * @returns {[React.RefObject, boolean]} [ref для элемента-секции, isVisible]
 */
export function useScrollReveal({ threshold = 0.3, rootMargin = '0px' } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}

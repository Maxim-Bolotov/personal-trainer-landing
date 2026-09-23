import { useEffect, useRef, useState } from 'react';
import Container from '../../ui/Container';
import Button from '../../ui/Button';
import styles from './Hero.module.css';

// Пауза перед стартом анимации ПОСЛЕ того, как видео готово к показу —
// только на мобильных/планшете: даём секции немного "повисеть" с одним
// видео, прежде чем начать проявлять текст. На десктопе паузы нет —
// анимация стартует сразу же, как только видео готово (см. useEffect ниже).
const REVEAL_DELAY_MOBILE_MS = 3000;
const REVEAL_DELAY_DESKTOP_MS = 0;
// Шаг между появлением каждой строки заголовка и финальным блоком текста+кнопки.
const REVEAL_STEP_MS = 220;
const DESKTOP_MEDIA_QUERY = '(min-width: 1025px)';
// На случай если видео не загрузится (медленная сеть/ошибка) — не держим
// спиннер и анимацию замороженными навсегда.
const VIDEO_READY_FALLBACK_MS = 8000;

function Hero() {
  // 0 — ничего не проявлено, 1..3 — строки заголовка по очереди,
  // 4 — блок текста и кнопки (разом, одной группой).
  const [step, setStep] = useState(0);
  // Пока видео не готово к показу — крутится спиннер вместо анимации текста
  // (и на мобильных, и на десктопе).
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    // Видео уже могло быть готово к моменту маунта (например, из bfcache) —
    // тогда событие loadeddata не прилетит, проверяем readyState сразу.
    if (video.readyState >= 2) {
      setVideoReady(true);
      return undefined;
    }

    const markReady = () => setVideoReady(true);
    video.addEventListener('loadeddata', markReady);
    video.addEventListener('error', markReady);
    const fallback = setTimeout(markReady, VIDEO_READY_FALLBACK_MS);

    return () => {
      video.removeEventListener('loadeddata', markReady);
      video.removeEventListener('error', markReady);
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    // Раскладываем появление по шагам через отдельные JS-таймеры (а не
    // CSS animation-delay/transition-delay): на iOS Safari у затянутых
    // задержек поверх постоянно перерисовывающегося <video> встречается
    // баг, из-за которого финальный кадр анимации остаётся "недокрашенным".
    // Каждый шаг — свой setTimeout, переключающий класс, transition при
    // этом срабатывает сразу же, без задержки внутри самого CSS.
    //
    // Стартуем эту цепочку только когда видео реально готово к показу —
    // до этого вместо анимации виден спиннер (см. videoReady/CSS).
    if (!videoReady) return undefined;

    const isDesktop = window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
    const baseDelay = isDesktop ? REVEAL_DELAY_DESKTOP_MS : REVEAL_DELAY_MOBILE_MS;

    const timers = [1, 2, 3, 4].map((n) =>
      setTimeout(() => setStep(n), baseDelay + (n - 1) * REVEAL_STEP_MS)
    );
    return () => timers.forEach(clearTimeout);
  }, [videoReady]);

  return (
    <section id="home" className={styles.hero}>
      <Container className={styles.inner}>
        <div className={styles.content}>
          {/* Одно предложение — одна строка, проявляются по очереди:
              1-я и 3-я строки — справа, 2-я — слева. */}
          <h1 className={styles.title}>
            <span
              className={`${styles.titleLine} ${styles.fromRight} ${step >= 1 ? styles.lineVisible : ''}`}
            >
              Стань сильнее.
            </span>
            <span
              className={`${styles.titleLine} ${styles.fromLeft} ${step >= 2 ? styles.lineVisible : ''}`}
            >
              Выгляди лучше.
            </span>
            <span
              className={`${styles.titleLine} ${styles.fromRight} ${step >= 3 ? styles.lineVisible : ''}`}
            >
              Живи увереннее.
            </span>
          </h1>

          {/* Текст и кнопка — следующий блок, проявляется разом одной
              группой, снизу вверх, после того как отыграет заголовок. */}
          <div className={`${styles.textGroup} ${step >= 4 ? styles.textGroupVisible : ''}`}>
            <p className={styles.text}>
              Персональный тренер, который поможет тебе стать сильнее, увереннее в себе и в
              отличной форме — благодаря индивидуальным программам тренировок и постоянной
              поддержке на каждом шаге.
            </p>
            <Button as="a" href="#programs" variant="primary" size="lg">
              Начать
            </Button>
          </div>
        </div>

        <div className={styles.imageWrapper}>
          <video
            ref={videoRef}
            className={styles.image}
            src="/videos/hero.mp4"
            poster="/images/hero-poster.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-label="Тренировка с персональным тренером"
          />
          {/* Пока видео грузится — спиннер поверх постера, и на мобильных,
              и на десктопе. Как только видео готово (событие loadeddata),
              спиннер убирается и стартует таймер/анимация выше. */}
          {!videoReady && <div className={styles.spinner} aria-hidden="true" />}
        </div>

        {/* Затемнение поверх видео — только на мобильных/планшете (см. CSS).
            Отдельный элемент, а не ::after: класс revealed переключается
            из JS-таймера, а не CSS animation-delay — на iOS Safari у
            долгих animation-delay поверх постоянно перерисовывающегося
            <video> встречается баг: финальный кадр анимации остаётся
            "недокрашенным" (текст/фон видны блёкло-серыми вместо полной
            непрозрачности). */}
        <div
          className={`${styles.overlay} ${step >= 1 ? styles.revealed : ''}`}
          aria-hidden="true"
        />
      </Container>
    </section>
  );
}

export default Hero;

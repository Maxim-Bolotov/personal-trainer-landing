import { useEffect, useRef, useState } from "react";
import Button from "../../ui/Button";
import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import { testimonials } from "../../../data/testimonials";
import ChatDialog from "./ChatDialog";
import styles from "./Testimonials.module.css";

const length = testimonials.length;
// Клон последнего слайда в начале и клон первого в конце — чтобы стрелка "вперёд"
// всегда ехала вправо (даже с последнего на первый), а "назад" — всегда влево.
const slides = [testimonials[length - 1], ...testimonials, testimonials[0]];

// Порог свайпа: доля ширины слайда, после которой листаем на соседний.
const SWIPE_THRESHOLD = 0.18;
// Сдвиг пальца (px), после которого решаем, какой это жест — горизонтальный или вертикальный.
const AXIS_LOCK_DISTANCE = 8;

function Testimonials() {
  const [displayIndex, setDisplayIndex] = useState(1);
  const [animate, setAnimate] = useState(true);
  const [dragOffset, setDragOffset] = useState(0);
  // Скриншот переписки, открытый в диалоге (null — диалог закрыт)
  const [chatSrc, setChatSrc] = useState(null);
  const touchRef = useRef(null);

  const activeIndex = (((displayIndex - 1) % length) + length) % length;

  const next = () => {
    setAnimate(true);
    setDisplayIndex((i) => i + 1);
  };

  const prev = () => {
    setAnimate(true);
    setDisplayIndex((i) => i - 1);
  };

  const goTo = (targetIndex) => {
    setAnimate(true);
    setDisplayIndex(targetIndex + 1);
  };

  // ---------- Свайп пальцем ----------
  // Слайд едет за пальцем (transition отключён), по отпусканию — либо
  // листаем на соседний, либо плавно возвращаемся. Вертикальный жест
  // не трогаем — страница скроллится как обычно (touch-action: pan-y).
  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    touchRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      width: event.currentTarget.offsetWidth,
      axis: null,
    };
  };

  const handleTouchMove = (event) => {
    const state = touchRef.current;
    if (!state) return;

    const touch = event.touches[0];
    const dx = touch.clientX - state.startX;
    const dy = touch.clientY - state.startY;

    if (!state.axis) {
      if (
        Math.abs(dx) < AXIS_LOCK_DISTANCE &&
        Math.abs(dy) < AXIS_LOCK_DISTANCE
      )
        return;
      state.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }

    if (state.axis === "x") {
      setDragOffset(dx);
    }
  };

  const handleTouchEnd = () => {
    const state = touchRef.current;
    touchRef.current = null;
    if (!state || state.axis !== "x") return;

    const ratio = dragOffset / state.width;
    setDragOffset(0);
    setAnimate(true);

    if (ratio <= -SWIPE_THRESHOLD) {
      setDisplayIndex((i) => i + 1);
    } else if (ratio >= SWIPE_THRESHOLD) {
      setDisplayIndex((i) => i - 1);
    }
  };

  const isDragging = dragOffset !== 0;

  const handleTransitionEnd = () => {
    if (displayIndex === 0) {
      setAnimate(false);
      setDisplayIndex(length);
    } else if (displayIndex === length + 1) {
      setAnimate(false);
      setDisplayIndex(1);
    }
  };

  // После бесшовного "прыжка" на клоне возвращаем анимацию для следующего клика.
  useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(id);
    }
    return undefined;
  }, [animate]);

  return (
    <section id="testimonials" className={styles.section}>
      <Container>
        <SectionTitle align="center" title="Отзывы обо мне" />

        <div className={styles.carousel}>
          <button
            type="button"
            className={styles.navButton}
            onClick={prev}
            aria-label="Предыдущий отзыв"
          >
            ←
          </button>

          <div
            className={styles.viewport}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
          >
            <div
              className={styles.track}
              style={{
                transform: `translateX(calc(-${
                  displayIndex * 100
                }% + ${dragOffset}px))`,
                transition: animate && !isDragging ? undefined : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {slides.map((testimonial, slideIndex) => {
                const hasPhotos = Boolean(
                  testimonial.before && testimonial.after
                );
                const hasQuote = Boolean(testimonial.quote);
                const cardClasses = [
                  styles.card,
                  !hasPhotos && styles.cardTextOnly,
                  !hasQuote && styles.cardPhotosOnly,
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <article
                    key={`${testimonial.id}-${slideIndex}`}
                    className={cardClasses}
                    // Неактивные слайды (и клоны) не должны ловить фокус: иначе браузер
                    // прокрутит viewport к сфокусированной кнопке и собьёт карусель.
                    inert={slideIndex !== displayIndex}
                  >
                    <div className={styles.textCol}>
                      {hasQuote && (
                        <>
                          <span className={styles.quoteMark} aria-hidden="true">
                            <span className={styles.quoteBar} />
                            <span className={styles.quoteBar} />
                          </span>

                          <p className={styles.quote}>{testimonial.quote}</p>
                        </>
                      )}

                      <div className={styles.author}>
                        <p className={styles.name}>{testimonial.name}</p>
                        <p className={styles.role}>{testimonial.role}</p>
                      </div>

                      {testimonial.chat && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className={styles.chatButton}
                          aria-haspopup="dialog"
                          onClick={() => setChatSrc(testimonial.chat)}
                        >
                          <svg
                            className={styles.chatIcon}
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M21 12a8 8 0 0 1-11.7 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" />
                          </svg>
                          Смотреть переписку
                        </Button>
                      )}
                    </div>

                    {hasPhotos && (
                      <div className={styles.imageCol}>
                        <div className={styles.photoRow}>
                          <figure className={styles.photoFrame}>
                            <img
                              src={testimonial.before}
                              alt={`${testimonial.name}: фото до`}
                              className={styles.photo}
                              width="640"
                              height="960"
                              loading="lazy"
                            />
                            <figcaption className={styles.tag}>До</figcaption>
                          </figure>
                          <figure className={styles.photoFrame}>
                            <img
                              src={testimonial.after}
                              alt={`${testimonial.name}: фото после`}
                              className={styles.photo}
                              width="640"
                              height="960"
                              loading="lazy"
                            />
                            <figcaption
                              className={`${styles.tag} ${styles.tagAfter}`}
                            >
                              После
                            </figcaption>
                          </figure>
                        </div>
                        <span
                          className={styles.quoteMarkSmall}
                          aria-hidden="true"
                        >
                          <span className={styles.quoteBarSmall} />
                          <span className={styles.quoteBarSmall} />
                        </span>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            className={styles.navButton}
            onClick={next}
            aria-label="Следующий отзыв"
          >
            →
          </button>
        </div>

        <div className={styles.dots} role="tablist" aria-label="Выбор отзыва">
          {testimonials.map((testimonial, dotIndex) => (
            <button
              key={testimonial.id}
              type="button"
              role="tab"
              aria-selected={dotIndex === activeIndex}
              aria-label={`Отзыв ${dotIndex + 1}`}
              className={`${styles.dot} ${
                dotIndex === activeIndex ? styles.dotActive : ""
              }`}
              onClick={() => goTo(dotIndex)}
            />
          ))}
        </div>
      </Container>

      <ChatDialog src={chatSrc} onClose={() => setChatSrc(null)} />
    </section>
  );
}

export default Testimonials;

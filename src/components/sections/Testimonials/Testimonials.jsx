import { useEffect, useState } from "react";
import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import { testimonials } from "../../../data/testimonials";
import styles from "./Testimonials.module.css";

const length = testimonials.length;
// Клон последнего слайда в начале и клон первого в конце — чтобы стрелка "вперёд"
// всегда ехала вправо (даже с последнего на первый), а "назад" — всегда влево.
const slides = [testimonials[length - 1], ...testimonials, testimonials[0]];

function Testimonials() {
  const [displayIndex, setDisplayIndex] = useState(1);
  const [animate, setAnimate] = useState(true);

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
        <SectionTitle align="center" title="Отзывы о нас" />

        <div className={styles.carousel}>
          <button
            type="button"
            className={styles.navButton}
            onClick={prev}
            aria-label="Предыдущий отзыв"
          >
            ←
          </button>

          <div className={styles.viewport}>
            <div
              className={styles.track}
              style={{
                transform: `translateX(-${displayIndex * 100}%)`,
                transition: animate ? undefined : "none",
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {slides.map((testimonial, slideIndex) => (
                <article
                  key={`${testimonial.id}-${slideIndex}`}
                  className={styles.card}
                >
                  <div className={styles.textCol}>
                    <span className={styles.quoteMark} aria-hidden="true">
                      <span className={styles.quoteBar} />
                      <span className={styles.quoteBar} />
                    </span>

                    <p className={styles.quote}>{testimonial.quote}</p>

                    <div className={styles.author}>
                      <p className={styles.name}>{testimonial.name}</p>
                      <p className={styles.role}>{testimonial.role}</p>
                    </div>
                  </div>

                  <div className={styles.imageCol}>
                    <div className={styles.photoRow}>
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className={styles.photo}
                        loading="lazy"
                      />
                      <img
                        src={testimonial.avatarSecondary}
                        alt=""
                        aria-hidden="true"
                        className={styles.photo}
                        loading="lazy"
                      />
                    </div>
                    <span className={styles.quoteMarkSmall} aria-hidden="true">
                      <span className={styles.quoteBarSmall} />
                      <span className={styles.quoteBarSmall} />
                    </span>
                  </div>
                </article>
              ))}
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
    </section>
  );
}

export default Testimonials;

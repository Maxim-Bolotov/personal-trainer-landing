import Container from '../../ui/Container';
import SectionTitle from '../../ui/SectionTitle';
import { testimonials } from '../../../data/testimonials';
import { useCarousel } from '../../../hooks/useCarousel';
import styles from './Testimonials.module.css';

function Testimonials() {
  const { index, next, prev, goTo } = useCarousel(testimonials.length);
  const current = testimonials[index];

  return (
    <section id="testimonials" className={styles.section}>
      <Container>
        <SectionTitle align="center" eyebrow="Отзывы" title="Отзывы о нас" />

        <div className={styles.carousel}>
          <button
            type="button"
            className={styles.navButton}
            onClick={prev}
            aria-label="Предыдущий отзыв"
          >
            ←
          </button>

          <article className={styles.card}>
            <div className={styles.textCol}>
              <span className={styles.quoteMark} aria-hidden="true">
                <span className={styles.quoteBar} />
                <span className={styles.quoteBar} />
              </span>

              <p className={styles.quote}>{current.quote}</p>

              <div className={styles.author}>
                <p className={styles.name}>{current.name}</p>
                <p className={styles.role}>{current.role}</p>
              </div>
            </div>

            <div className={styles.imageCol}>
              <div className={styles.photoRow}>
                <img
                  src={current.avatar}
                  alt={current.name}
                  className={styles.photo}
                  loading="lazy"
                />
                <img
                  src={current.avatarSecondary}
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
              aria-selected={dotIndex === index}
              aria-label={`Отзыв ${dotIndex + 1}`}
              className={`${styles.dot} ${dotIndex === index ? styles.dotActive : ''}`}
              onClick={() => goTo(dotIndex)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Testimonials;

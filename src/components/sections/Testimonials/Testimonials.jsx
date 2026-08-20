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
            <span className={styles.quoteMark} aria-hidden="true">
              &ldquo;
            </span>

            <p className={styles.quote}>{current.quote}</p>

            <div className={styles.author}>
              <img
                src={current.avatar}
                alt={current.name}
                className={styles.avatar}
                loading="lazy"
              />
              <div>
                <p className={styles.name}>{current.name}</p>
                <p className={styles.role}>{current.role}</p>
              </div>
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

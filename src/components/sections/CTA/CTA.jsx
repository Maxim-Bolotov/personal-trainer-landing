import Container from '../../ui/Container';
import Button from '../../ui/Button';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import reveal from '../../../styles/scrollReveal.module.css';
import styles from './CTA.module.css';

function CTA() {
  const [sectionRef, isVisible] = useScrollReveal();

  return (
    <section ref={sectionRef} className={styles.section}>
      <Container className={styles.inner}>
        <div
          className={[styles.imageWrapper, reveal.reveal, reveal.fromLeft, isVisible && reveal.visible]
            .filter(Boolean)
            .join(' ')}
        >
          <img
            className={styles.image}
            src="/images/cta-photo.jpg"
            alt="Тренировка с персональным тренером"
            loading="lazy"
          />
        </div>

        <div className={styles.content}>
          <h2
            className={[styles.title, reveal.reveal, reveal.fromRight, isVisible && reveal.visible]
              .filter(Boolean)
              .join(' ')}
            style={{ '--reveal-delay': '200ms' }}
          >
            Хочешь тренироваться со мной?
          </h2>
          <p
            className={[styles.text, reveal.reveal, reveal.fromRight, isVisible && reveal.visible]
              .filter(Boolean)
              .join(' ')}
            style={{ '--reveal-delay': '380ms' }}
          >
            Запишитесь на бесплатную вводную консультацию — обсудим цели, текущий уровень
            подготовки и подберём программу, которая приведёт к результату.
          </p>
          <Button
            as="a"
            href="#programs"
            variant="primary"
            size="lg"
            className={[reveal.reveal, reveal.fromRight, isVisible && reveal.visible].filter(Boolean).join(' ')}
            style={{ '--reveal-delay': '560ms' }}
          >
            Начать
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default CTA;

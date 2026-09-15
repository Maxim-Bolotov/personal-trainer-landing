import Container from '../../ui/Container';
import Button from '../../ui/Button';
import styles from './CTA.module.css';

function CTA() {
  return (
    <section className={styles.section}>
      <Container className={styles.inner}>
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src="/images/cta-photo.svg" /* TODO: заменить на экспорт из Figma */
            alt="Тренировка с персональным тренером"
            loading="lazy"
          />
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>Хочешь тренироваться со мной?</h2>
          <p className={styles.text}>
            Запишитесь на бесплатную вводную консультацию — обсудим цели, текущий уровень
            подготовки и подберём программу, которая приведёт к результату.
          </p>
          <Button as="a" href="#programs" variant="primary" size="lg">
            Начать
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default CTA;

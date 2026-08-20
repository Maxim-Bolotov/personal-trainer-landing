import Container from '../../ui/Container';
import Button from '../../ui/Button';
import styles from './Hero.module.css';

function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <span className={styles.watermark} aria-hidden="true">
        JOHN DOE
      </span>

      <Container className={styles.inner}>
        <div className={styles.content}>
          <h1 className={styles.title}>Превращай трудности в победы!</h1>
          <p className={styles.text}>
            Как увлечённый персональный тренер, я помогаю людям достигать своих целей в
            фитнесе через индивидуальный коучинг и поддержку.
          </p>
          <Button as="a" href="#programs" variant="primary" size="lg">
            Начать
          </Button>
        </div>

        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src="/images/hero-photo.svg" /* TODO: заменить на экспорт из Figma (Export → PNG/JPG, 535×883 или больше) */
            alt="Персональный тренер Джон"
            width={535}
            height={883}
            fetchPriority="high"
          />
        </div>
      </Container>
    </section>
  );
}

export default Hero;

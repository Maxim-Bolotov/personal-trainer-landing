import Container from '../../ui/Container';
import Button from '../../ui/Button';
import styles from './Hero.module.css';

function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <Container className={styles.inner}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Стань сильнее.
            <br />
            Выгляди лучше.
            <br />
            Живи увереннее.
          </h1>
          <p className={styles.text}>
            Персональный тренер, который поможет тебе стать сильнее, увереннее в себе и в
            отличной форме — благодаря индивидуальным программам тренировок и постоянной
            поддержке на каждом шаге.
          </p>
          <Button as="a" href="#programs" variant="primary" size="lg">
            Начать
          </Button>
        </div>

        <div className={styles.imageWrapper}>
          <video
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
        </div>
      </Container>
    </section>
  );
}

export default Hero;

import Container from '../../ui/Container';
import styles from './About.module.css';

const stats = [
  { id: 'clients', value: '2000+', label: 'довольных клиентов' },
  { id: 'years', value: '10', label: 'лет опыта' },
  { id: 'programs', value: '15', label: 'Лет в спорте' },
];

function About() {
  return (
    <section id="about" className={styles.about}>
      <Container className={styles.inner}>
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src="/images/about-photo.png"
            alt="Персональный тренер"
            width={545}
            height={453}
            loading="lazy"
          />
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>Кто такой Джон?</h2>
          <p className={styles.text}>
            Как увлечённый персональный тренер, я верю в то, что могу помочь людям достичь своих
            целей в фитнесе через индивидуальный коучинг и поддержку.
          </p>

          <dl className={styles.stats}>
            {stats.map((stat) => (
              <div key={stat.id} className={styles.stat}>
                <dt className={styles.statValue}>{stat.value}</dt>
                <dd className={styles.statLabel}>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}

export default About;

import Container from '../../ui/Container';
import styles from './About.module.css';

const stats = [
  { id: 'clients', value: '250+', label: 'довольных клиентов' },
  { id: 'years', value: '8', label: 'лет практики' },
  { id: 'programs', value: '15+', label: 'авторских программ' },
];

function About() {
  return (
    <section id="about" className={styles.about}>
      <Container className={styles.inner}>
        <div className={styles.imageWrapper}>
          <img
            className={styles.image}
            src="/images/about-photo.svg" /* TODO: заменить на экспорт из Figma */
            alt="Джон — персональный тренер"
            width={480}
            height={560}
            loading="lazy"
          />
        </div>

        <div className={styles.content}>
          <h2 className={styles.title}>Кто такой Джон?</h2>
          <p className={styles.text}>
            Я увлечён тем, что могу помочь людям раскрыть свой потенциал. Более восьми лет я
            занимаюсь персональным тренерством, сочетая научный подход к тренировкам с
            вниманием к индивидуальным особенностям каждого клиента.
          </p>
          <p className={styles.text}>
            Моя миссия — не просто провести тренировку, а выстроить систему, которая станет
            частью вашей жизни: осознанные тренировки, сбалансированное питание и постоянная
            поддержка на пути к результату.
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

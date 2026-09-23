import Container from '../../ui/Container';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import reveal from '../../../styles/scrollReveal.module.css';
import styles from './About.module.css';

const stats = [
  { id: 'clients', value: '2000+', label: 'довольных клиентов' },
  { id: 'years', value: '6', label: 'лет опыта' },
  { id: 'sport', value: '24', label: 'года в спорте' },
];

function About() {
  const [sectionRef, isVisible] = useScrollReveal();

  return (
    <section id="about" ref={sectionRef} className={styles.about}>
      <Container className={styles.inner}>
        <div
          className={[styles.imageWrapper, reveal.reveal, reveal.fromLeft, isVisible && reveal.visible]
            .filter(Boolean)
            .join(' ')}
        >
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
          <h2
            className={[styles.title, reveal.reveal, reveal.fromRight, isVisible && reveal.visible]
              .filter(Boolean)
              .join(' ')}
            style={{ '--reveal-delay': '200ms' }}
          >
            Коротко обо мне
          </h2>
          <p
            className={[styles.text, reveal.reveal, reveal.fromRight, isVisible && reveal.visible]
              .filter(Boolean)
              .join(' ')}
            style={{ '--reveal-delay': '380ms' }}
          >
            Меня зовут Владислав, мне 30 лет, и в спорте я с 6 лет. Персональным тренером
            работаю с 2020 года — помогаю людям стать сильнее, увереннее в себе и в отличной
            форме через грамотные тренировки и постоянную поддержку. Рад буду поработать и с вами!
          </p>

          <dl
            className={[styles.stats, reveal.reveal, reveal.fromRight, isVisible && reveal.visible]
              .filter(Boolean)
              .join(' ')}
            style={{ '--reveal-delay': '560ms' }}
          >
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

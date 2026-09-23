import Container from '../../ui/Container';
import { qualificationBadges } from '../../../data/qualifications';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import reveal from '../../../styles/scrollReveal.module.css';
import styles from './Qualifications.module.css';

function Qualifications() {
  const [sectionRef, isVisible] = useScrollReveal();

  return (
    <section id="qualifications" ref={sectionRef} className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.content}>
            <h2
              className={[styles.title, reveal.reveal, reveal.fromLeft, isVisible && reveal.visible]
                .filter(Boolean)
                .join(' ')}
              style={{ '--reveal-delay': '200ms' }}
            >
              Квалификация
            </h2>
            <p
              className={[styles.text, reveal.reveal, reveal.fromLeft, isVisible && reveal.visible]
                .filter(Boolean)
                .join(' ')}
              style={{ '--reveal-delay': '380ms' }}
            >
              Мастер спорта по армейскому рукопашному бою, чемпион и многократный призёр
              кубков России, кандидат мастера спорта по футболу. Профильное образование в
              фитнес-инструктировании, тренерской работе и нутрициологии. Специализация — силовые
              и кардио-тренировки, ОФП, ЛФК, мобильность и растяжка, коррекция веса и питания.
            </p>

            <ul
              className={[styles.badges, reveal.reveal, reveal.fromLeft, isVisible && reveal.visible]
                .filter(Boolean)
                .join(' ')}
              style={{ '--reveal-delay': '560ms' }}
            >
              {qualificationBadges.map((badge) => (
                <li key={badge} className={styles.badge}>
                  {badge}
                </li>
              ))}
            </ul>
          </div>

          <div
            className={[styles.imageWrapper, reveal.reveal, reveal.fromRight, isVisible && reveal.visible]
              .filter(Boolean)
              .join(' ')}
          >
            <img
              className={styles.image}
              src="/images/qualification-photo.jpg"
              alt="Персональный тренер — квалификация"
              width={545}
              height={453}
              loading="lazy"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Qualifications;

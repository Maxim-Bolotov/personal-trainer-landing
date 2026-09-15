import Container from '../../ui/Container';
import { qualificationBadges } from '../../../data/qualifications';
import styles from './Qualifications.module.css';

function Qualifications() {
  return (
    <section id="qualifications" className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.content}>
            <h2 className={styles.title}>Квалификация</h2>
            <p className={styles.text}>
              Сертифицированный персональный тренер с многолетней практикой: научный подход к
              тренировкам, индивидуальные программы питания и постоянная поддержка на пути к
              результату.
            </p>

            <ul className={styles.badges}>
              {qualificationBadges.map((badge) => (
                <li key={badge} className={styles.badge}>
                  {badge}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.imageWrapper}>
            <img
              className={styles.image}
              src="/images/about-photo.svg" /* TODO: заменить на экспорт из Figma */
              alt="Персональный тренер — квалификация"
              width={503}
              height={478}
              loading="lazy"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Qualifications;

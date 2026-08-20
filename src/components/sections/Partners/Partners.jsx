import Container from '../../ui/Container';
import styles from './Partners.module.css';

// Логотипы партнёров/СМИ — заменить на реальные из экспортов Figma
const logos = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  src: `/images/partner-${i + 1}.svg`,
  alt: `Партнёр ${i + 1}`,
}));

function Partners() {
  return (
    <section className={styles.partners} aria-label="Нам доверяют">
      <Container>
        <ul className={styles.list}>
          {logos.map((logo) => (
            <li key={logo.id} className={styles.item}>
              <img src={logo.src} alt={logo.alt} className={styles.logo} loading="lazy" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default Partners;

import Container from '../../ui/Container';
import SectionTitle from '../../ui/SectionTitle';
import { qualifications } from '../../../data/qualifications';
import styles from './Qualifications.module.css';

function Qualifications() {
  return (
    <section id="qualifications" className={styles.section}>
      <Container>
        <SectionTitle
          eyebrow="Почему я"
          title="Квалификация и качества"
          description="Профессиональный подход, который сочетает опыт, гибкость и постоянную вовлечённость в результат каждого клиента."
        />

        <ul className={styles.grid}>
          {qualifications.map((item) => (
            <li key={item.id} className={styles.card}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardText}>{item.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export default Qualifications;

import Container from '../../ui/Container';
import SectionTitle from '../../ui/SectionTitle';
import Button from '../../ui/Button';
import { programs } from '../../../data/programs';
import styles from './Programs.module.css';

function Programs() {
  return (
    <section id="programs" className={styles.section}>
      <Container>
        <SectionTitle
          align="center"
          eyebrow="Тарифы"
          title="Программы тренировок"
          description="Выберите формат сопровождения, который подходит именно вам — от базового старта до полного погружения."
        />

        <div className={styles.grid}>
          {programs.map((program) => (
            <article
              key={program.id}
              className={`${styles.card} ${program.featured ? styles.featured : ''}`}
            >
              {program.featured && <span className={styles.badge}>Популярный</span>}

              <h3 className={styles.title}>{program.title}</h3>
              <p className={styles.description}>{program.description}</p>

              <p className={styles.price}>
                <span className={styles.priceValue}>${program.price}</span>
                <span className={styles.pricePeriod}>/ {program.period}</span>
              </p>

              <ul className={styles.features}>
                {program.features.map((feature) => (
                  <li key={feature} className={styles.feature}>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                as="a"
                href="#faq"
                variant={program.featured ? 'primary' : 'outline'}
                size="md"
                className={styles.cta}
              >
                Выбрать программу
              </Button>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Programs;

import { useState } from 'react';
import Container from '../../ui/Container';
import SectionTitle from '../../ui/SectionTitle';
import FaqItem from './FaqItem.jsx';
import { faqItems } from '../../../data/faq';
import styles from './Faq.module.css';

function Faq() {
  const [openId, setOpenId] = useState(faqItems[0]?.id ?? null);

  const handleToggle = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section id="faq" className={styles.section}>
      <Container className={styles.inner}>
        <SectionTitle eyebrow="FAQ" title="Часто задаваемые вопросы" className={styles.title} />

        <div className={styles.list}>
          {faqItems.map((item) => (
            <FaqItem
              key={item.id}
              question={item.question}
              answer={item.answer}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Faq;

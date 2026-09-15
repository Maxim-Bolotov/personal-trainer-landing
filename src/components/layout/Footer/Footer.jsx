import Container from '../../ui/Container';
import { navLinks } from '../../../data/navigation';
import { socialLinks } from '../../../data/social';
import { contactInfo } from '../../../data/contact';
import styles from './Footer.module.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <p className={styles.logo}>
              Персональный
              <br />
              тренер
            </p>
            <p className={styles.tagline}>
              Индивидуальный коучинг и программы тренировок, которые приводят к результату.
            </p>

            <ul className={styles.socialList}>
              {socialLinks.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={styles.socialLink}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Навигация в футере" className={styles.col}>
            <p className={styles.colTitle}>Меню</p>
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.navLink}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.col}>
            <p className={styles.colTitle}>Contact</p>
            <ul className={styles.contactList}>
              {contactInfo.map((item) =>
                item.href ? (
                  <li key={item.id}>
                    <a href={item.href} className={styles.contactLink}>
                      {item.label}
                    </a>
                  </li>
                ) : (
                  <li key={item.id} className={styles.contactLink}>
                    {item.label}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {year} Персональный тренер. Все права защищены.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;

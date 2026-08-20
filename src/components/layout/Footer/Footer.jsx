import Container from '../../ui/Container';
import { navLinks } from '../../../data/navigation';
import { socialLinks } from '../../../data/social';
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
          </div>

          <nav aria-label="Навигация в футере">
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

          <ul className={styles.socialList}>
            {socialLinks.map((social) => (
              <li key={social.id}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={styles.socialLink}
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
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

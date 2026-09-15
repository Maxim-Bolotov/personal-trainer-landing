import { useEffect, useState } from 'react';
import Container from '../../ui/Container';
import Button from '../../ui/Button';
import { navLinks } from '../../../data/navigation';
import styles from './Header.module.css';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Закрываем мобильное меню при переходе по ссылке
  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <header className={`${styles.header} ${isScrolled || isMenuOpen ? styles.scrolled : ''}`}>
      <Container className={styles.inner}>
        <a href="#home" className={styles.logo} onClick={handleLinkClick}>
          Персональный
          <br />
          тренер
        </a>

        <nav
          className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}
          aria-label="Основная навигация"
        >
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.navLink} onClick={handleLinkClick}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button as="a" href="#programs" variant="primary" size="sm" className={styles.cta}>
            Начать
          </Button>

          <button
            type="button"
            className={styles.burger}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </Container>
    </header>
  );
}

export default Header;

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Container from '../../ui/Container';
import Button from '../../ui/Button';
import { navLinks } from '../../../data/navigation';
import styles from './Header.module.css';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState(navLinks[0]?.href.slice(1) ?? '');
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Публикуем реальную высоту хедера в CSS-переменную --header-height.
  // На неё опираются десктопные full-height секции (main > section в
  // global.css), чтобы каждая занимала ровно весь экран за вычетом хедера,
  // и scroll-snap не прятал верх секции под sticky-хедером.
  useLayoutEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return undefined;

    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty(
        '--header-height',
        `${headerEl.offsetHeight}px`
      );
    };

    updateHeaderHeight();

    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    resizeObserver.observe(headerEl);

    return () => resizeObserver.disconnect();
  }, []);

  // Подсвечиваем в навигации ссылку на секцию, которая сейчас видна на экране
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter(Boolean);

    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (mostVisible) {
          setActiveId(mostVisible.target.id);
        }
      },
      { threshold: [0.5] }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Закрываем мобильное меню при переходе по ссылке
  const handleLinkClick = () => setIsMenuOpen(false);

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${isScrolled || isMenuOpen ? styles.scrolled : ''}`}
    >
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
                <a
                  href={link.href}
                  className={`${styles.navLink} ${activeId === link.href.slice(1) ? styles.navLinkActive : ''}`}
                  onClick={handleLinkClick}
                >
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

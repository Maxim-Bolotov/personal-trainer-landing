import { useEffect, useRef } from "react";
import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import Button from "../../ui/Button";
import { programs } from "../../../data/programs";
import { formatPrice } from "../../../utils/formatPrice";
import { useBookingModal } from "../../../hooks/useBookingModal";
import styles from "./Programs.module.css";

// Тройной повтор карточек для бесшовной зацикленной прокрутки: изначально встаём
// на среднюю копию, а если скролл (кликом по стрелке или свайпом на телефоне)
// уводит в соседний клон-комплект — тихо, без анимации, переносим scrollLeft
// в эквивалентную точку средней копии. Снаружи это выглядит как бесконечная лента,
// всегда едущая в ту сторону, куда нажали/свайпнули.
const loopedPrograms = [...programs, ...programs, ...programs];

function Programs() {
  const { openModal } = useBookingModal();
  const trackRef = useRef(null);
  const settleTimer = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const oneSetWidth = track.scrollWidth / 3;
    track.scrollLeft = oneSetWidth;

    return () => {
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
  }, []);

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;

    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      const currentTrack = trackRef.current;
      if (!currentTrack) return;

      const oneSetWidth = currentTrack.scrollWidth / 3;
      while (currentTrack.scrollLeft < oneSetWidth) {
        currentTrack.scrollLeft += oneSetWidth;
      }
      while (currentTrack.scrollLeft >= oneSetWidth * 2) {
        currentTrack.scrollLeft -= oneSetWidth;
      }
    }, 120);
  };

  const scroll = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    // Запрашиваем скролл на всю ширину видимой области — CSS scroll-snap-stop: always
    // сам остановит его точно на следующей/предыдущей карточке, без ручного расчёта
    // ширины карточки и gap (что на границах трека давало «недокрут» на пиксель-два).
    track.scrollBy({ left: direction * track.clientWidth, behavior: "smooth" });
  };

  return (
    <section id="programs" className={styles.section}>
      <Container>
        <SectionTitle
          align="center"
          title="Программы тренировок"
          description="Выберите формат сопровождения, который подходит именно вам — от базового старта до полного погружения."
        />

        <div className={styles.carousel}>
          <button
            type="button"
            className={styles.navButton}
            onClick={() => scroll(-1)}
            aria-label="Предыдущая программа"
          >
            ←
          </button>

          <div className={styles.track} ref={trackRef} onScroll={handleScroll}>
            {loopedPrograms.map((program, loopIndex) => (
              <article
                key={`${program.id}-${loopIndex}`}
                className={`${styles.card} ${
                  program.featured ? styles.featured : ""
                }`}
              >
                <h3 className={styles.title}>{program.title}</h3>

                <p className={styles.price}>
                  <span className={styles.priceValue}>{formatPrice(program.price)}</span>
                </p>
                <p className={styles.pricePeriod}>
                  Абонемент на {program.period}
                </p>

                <p className={styles.description}>{program.description}</p>

                <Button
                  type="button"
                  variant={program.featured ? "primary" : "outline"}
                  size="md"
                  className={styles.cta}
                  onClick={() => openModal(program.id)}
                >
                  Выбрать программу
                </Button>
              </article>
            ))}
          </div>

          <button
            type="button"
            className={styles.navButton}
            onClick={() => scroll(1)}
            aria-label="Следующая программа"
          >
            →
          </button>
        </div>
      </Container>
    </section>
  );
}

export default Programs;

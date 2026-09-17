import { useEffect, useState } from 'react';
import Button from '../../ui/Button';
import { useBookingModal } from '../../../hooks/useBookingModal';
import { programs } from '../../../data/programs';
import { sendLeadToTelegram } from '../../../utils/telegram';
import { createInitialFormData, createInitialTouched, markAllTouched } from './helpers';
import { validateStepOne, validateStepTwo, validateStepThree } from './validation';
import StepIndicator from './StepIndicator';
import LoadingState from './LoadingState';
import ThanksState from './ThanksState';
import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';
import styles from './BookingModal.module.css';

const SPINNER_DURATION_MS = 3000;

function BookingModal() {
  const { isOpen, selectedProgramId, closeModal } = useBookingModal();

  const [step, setStep] = useState(1);
  // 'step' — заполнение шагов 1-3, 'loading' — 3-секундный спиннер после
  // отправки, 'thanks' — экран благодарности.
  const [stage, setStage] = useState('step');
  const [formData, setFormData] = useState(() => createInitialFormData());
  const [touched, setTouched] = useState(() => createInitialTouched());

  // Сброс формы на каждое открытие модалки — включая подстановку программы,
  // если пришли с карточки конкретной программы (Programs.jsx).
  useEffect(() => {
    if (!isOpen) return;
    setStep(1);
    setStage('step');
    setFormData(createInitialFormData(selectedProgramId));
    setTouched(createInitialTouched());
  }, [isOpen, selectedProgramId]);

  // Блокируем скролл страницы, пока открыта модалка.
  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Закрытие по Esc — только пока не идёт отправка.
  useEffect(() => {
    if (!isOpen || stage === 'loading') return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, stage, closeModal]);

  if (!isOpen) return null;

  const step1Errors = validateStepOne(formData.step1);
  const step2Errors = validateStepTwo(formData.step2);
  const step3Errors = validateStepThree(formData.step3);
  const step3TouchedAny = Object.values(touched.step3).some(Boolean);
  const step3GeneralError = step === 3 && step3Errors.general && step3TouchedAny ? step3Errors.general : null;

  const updateStep1 = (field, value) => {
    setFormData((prev) => {
      const step1 = { ...prev.step1, [field]: value };
      if (field === 'healthNotes' && value.trim()) step1.noHealthIssues = false;
      return { ...prev, step1 };
    });
  };

  const updateStep2 = (field, value) => {
    setFormData((prev) => ({ ...prev, step2: { ...prev.step2, [field]: value } }));
  };

  const updateStep3 = (field, value) => {
    setFormData((prev) => ({ ...prev, step3: { ...prev.step3, [field]: value } }));
  };

  const blurField = (stepKey, field) => {
    setTouched((prev) => ({ ...prev, [stepKey]: { ...prev[stepKey], [field]: true } }));
  };

  const goNext = () => {
    if (step === 1) {
      if (Object.keys(step1Errors).length > 0) {
        setTouched((prev) => ({ ...prev, step1: markAllTouched(prev.step1) }));
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      if (Object.keys(step2Errors).length > 0) {
        setTouched((prev) => ({ ...prev, step2: markAllTouched(prev.step2) }));
        return;
      }
      setStep(3);
    }
  };

  const goBack = () => setStep((prev) => Math.max(1, prev - 1));

  const submitLead = () => {
    if (Object.keys(step3Errors).length > 0) {
      setTouched((prev) => ({ ...prev, step3: markAllTouched(prev.step3) }));
      return;
    }

    setStage('loading');

    const program = programs.find((p) => p.id === formData.step2.programId);
    const lead = {
      ...formData.step1,
      ...formData.step2,
      ...formData.step3,
      programTitle: program ? program.title : formData.step2.programId,
    };

    const minDelay = new Promise((resolve) => setTimeout(resolve, SPINNER_DURATION_MS));
    Promise.all([minDelay, sendLeadToTelegram(lead)]).then(() => {
      setStage('thanks');
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (stage !== 'step') return;
    if (step < 3) {
      goNext();
    } else {
      submitLead();
    }
  };

  const handleOverlayMouseDown = (e) => {
    if (e.target === e.currentTarget && stage !== 'loading') closeModal();
  };

  return (
    <div className={styles.overlay} onMouseDown={handleOverlayMouseDown}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="booking-modal-title">
        {stage !== 'loading' && (
          <button type="button" className={styles.closeButton} aria-label="Закрыть форму" onClick={closeModal}>
            ✕
          </button>
        )}

        {stage === 'step' && (
          <form className={styles.form} onSubmit={handleFormSubmit} noValidate>
            <h2 id="booking-modal-title" className={styles.title}>
              Запись на тренировки
            </h2>
            <StepIndicator step={step} />

            <div className={styles.body}>
              {/* Общая ошибка шага 3 рендерится здесь, ВНЕ .bodyScroll — если
               * положить её внутрь скроллящегося контейнера, position:absolute
               * с выносом над контентом (см. .generalError) обрежется его
               * overflow: auto (браузер не скроллит к контенту ВЫШЕ верхней
               * границы). Здесь она просто плавает над полями, не двигая их. */}
              {step3GeneralError && (
                <p className={styles.generalError} role="alert">
                  {step3GeneralError}
                </p>
              )}
              <div className={styles.bodyScroll}>
                {step === 1 && (
                  <StepOne
                    data={formData.step1}
                    errors={step1Errors}
                    touched={touched.step1}
                    onChange={updateStep1}
                    onBlur={(field) => blurField('step1', field)}
                  />
                )}
                {step === 2 && (
                  <StepTwo
                    data={formData.step2}
                    errors={step2Errors}
                    touched={touched.step2}
                    onChange={updateStep2}
                    onBlur={(field) => blurField('step2', field)}
                  />
                )}
                {step === 3 && (
                  <StepThree
                    data={formData.step3}
                    errors={step3Errors}
                    touched={touched.step3}
                    onChange={updateStep3}
                    onBlur={(field) => blurField('step3', field)}
                  />
                )}
              </div>
            </div>

            <div className={styles.footer}>
              {step > 1 && (
                <Button type="button" variant="outline" size="md" onClick={goBack}>
                  Назад
                </Button>
              )}
              <Button type="submit" variant="primary" size="md">
                {step < 3 ? 'Далее' : 'Отправить'}
              </Button>
            </div>
          </form>
        )}

        {stage === 'loading' && <LoadingState />}
        {stage === 'thanks' && <ThanksState name={formData.step1.name.trim()} onClose={closeModal} />}
      </div>
    </div>
  );
}

export default BookingModal;

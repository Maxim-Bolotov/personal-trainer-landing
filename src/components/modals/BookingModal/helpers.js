/**
 * Начальное состояние данных формы. programId подставляется, если модалка
 * открыта с карточки конкретной программы (см. BookingModalContext).
 */
export function createInitialFormData(programId = '') {
  return {
    step1: {
      name: '',
      age: '',
      weight: '',
      height: '',
      healthNotes: '',
      noHealthIssues: false,
    },
    step2: {
      programId,
      desiredResult: '',
    },
    step3: {
      phone: '',
      email: '',
      telegram: '',
      max: '',
    },
  };
}

export function createInitialTouched() {
  return {
    step1: { name: false, age: false, weight: false, height: false, healthNotes: false },
    step2: { programId: false, desiredResult: false },
    step3: { phone: false, email: false, telegram: false, max: false },
  };
}

/** Помечает все поля шага как touched — используется при попытке перейти дальше/отправить. */
export function markAllTouched(touchedStep) {
  return Object.keys(touchedStep).reduce((acc, key) => {
    acc[key] = true;
    return acc;
  }, {});
}

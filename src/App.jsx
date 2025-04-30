import { act, useState } from "react";
import styles from "./app.module.css";
import data from "./data.json";

export const App = () => {
  // Можно задать 2 состояния — steps и activeIndex

  // И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала

  // И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем

  const [steps, setSteps] = useState(data);
  const [activeIndex, setActiveIndex] = useState(0);
  const isFirstStep = activeIndex === 0 ? true : false;
  const isLastStep = activeIndex === steps.length - 1 ? true : false;

  const handleNext = () => {
    if (!isLastStep) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(0);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const goToStep = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Инструкция по готовке пельменей</h1>
        <div className={styles.steps}>
          <div className={styles["steps-content"]}>
            {/* Для получения активного контента использйте steps и activeIndex */}
            {steps[activeIndex].content}
          </div>
          <ul className={styles["steps-list"]}>
            {/* Выводите <li> с помощью массива steps и метода map(), подставляя в разметку нужные значения и классы */}
            {steps.map((item, index) => {
              return (
                <li
                  key={item.id}
                  className={
                    styles["steps-item"] +
                    " " +
                    (index === activeIndex
                      ? styles.active
                      : index <= activeIndex
                      ? styles.done
                      : "")
                  }
                  onClick={() => {
                    goToStep(index);
                  }}
                >
                  <button className={styles["steps-item-button"]}>
                    {index + 1}
                  </button>
                  Шаг {index + 1}
                </li>
              );
            })}
          </ul>
          <div className={styles["buttons-container"]}>
            <button
              className={styles.button}
              onClick={handlePrev}
              disabled={isFirstStep}
            >
              Назад
            </button>
            {!isLastStep ? (
              <button
                className={styles.button}
                onClick={handleNext}
                disabled={isLastStep}
              >
                Далее
                {/* "Начать сначала", можно сделать этой же кнопкой, просто подменять обработчик и текст в зависимости от условия */}
                {/* Или заменять всю кнопку в зависимости от условия */}
              </button>
            ) : (
              <button className={styles.button} onClick={handleNext}>
                Начать сначала
                {/* "Начать сначала", можно сделать этой же кнопкой, просто подменять обработчик и текст в зависимости от условия */}
                {/* Или заменять всю кнопку в зависимости от условия */}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

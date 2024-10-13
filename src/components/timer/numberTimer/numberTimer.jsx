import React from "react";
import "./numberTimer.scss";


/**
 * A NumberTimer component that renders the given numberActive as a number between 0 and maxValue.
 * The numberActive is rendered as an "active" class, and the numbers directly before and after it are
 * rendered as "desactive" and "next" classes respectively. All other numbers are rendered as "none"
 * classes.
 * @param {{numberActive: number, maxValue: number}} props - The props object containing numberActive
 * and maxValue.
 * @returns {ReactElement} - The rendered React element.
 */
function NumberTimer({ numberActive, maxValue }) {
  const numbers = [];
  for (let i = 0; i <= maxValue; i++) {
    numbers.push(i);
  }
 
  return (
    <div className="number-timer-cont">
      {numbers.map((number) => (
        <div
          key={number}
          className={`number ${
            number === parseInt(numberActive)
              ? "active"
              : number === parseInt(numberActive) - 1 ||
                (parseInt(number) === parseInt(maxValue) && parseInt(numberActive) === 0)
              ? "desactive"
              : number === parseInt(numberActive) +1 ||
                (parseInt(numberActive) === parseInt(maxValue) && parseInt(number) === 0)
              ? "next"
              : "none"
          }`}
        >
          {number}
        </div>
      ))}
    </div>
  );
}

export default NumberTimer;

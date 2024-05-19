import React from "react";
import "./numberTimer.scss";
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

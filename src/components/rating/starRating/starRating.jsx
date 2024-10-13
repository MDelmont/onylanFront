import React from 'react';
import "./starRating.scss";

/**
 * A StarRating component that displays a star rating with a gradient effect.
 * This component is used in the Rating component to display the rating of a game.
 * @param {Object} props
 * @param {Number} props.id - The id of the star rating.
 * @param {Number} props.value - The value of the star rating.
 * @param {String} props.htmlFor - The htmlFor attribute of the input element.
 * @param {Boolean} props.isActive - Whether the star rating is active or not.
 * @param {Function} props.onClick - The function to call when the star rating is clicked.
 * @returns {JSX.Element} A JSX element representing the star rating.
 */
const StarRating = ({ id,value,htmlFor ,isActive, onClick}) => {
  return (
    <div className={`star ${isActive ? "active":""}`}>

    <input type="radio" id={ `${htmlFor}${id}`} name="rate" value={value} onChange={onClick} />
    <label htmlFor={`${htmlFor}${id}`} title="text">
      <svg
        viewBox="0 0 576 512"
        height="1em"
        xmlns="http://www.w3.org/2000/svg"
        className="star-solid"
      >
        <defs>
          <linearGradient id={`grad${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop className='stop-one' offset="0%" />
            <stop className='stop-two' offset="50%" />
            <stop className='stop-three' offset="100%" />
          </linearGradient>

          <linearGradient id={`stroke-grad${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop className='stop-one' offset="0%" />
            <stop className='stop-two' offset="50%" />
            <stop className='stop-three' offset="100%" />
          </linearGradient>
        
        </defs>
        <path
          d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
          fill={`url(#grad${id})`}
        />
        <path
          d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
          fill="transparent"
          stroke={`url(#stroke-grad${id})`}
        />
      </svg>
    </label>
    </div>
  );
};

export default StarRating;

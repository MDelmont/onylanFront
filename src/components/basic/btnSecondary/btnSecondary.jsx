
import "./btnSecondary.scss"

/**
 * Generates a secondary button with a given title, onClick callback, and disabled state
 * @param {string} title - The text to display on the button
 * @param {function} onClick - The callback function when the button is clicked
 * @param {boolean} disabled - Whether the button is disabled or not
 * @param {string} type - The type of button (e.g. "submit", "button", etc.)
 * @param {string} id - The id of the button
 * @returns A button element with the given properties
 */
const BtnSecondary = ({title,onClick,disabled,type,id}) => {

  return (
    <button id={id} type={type} className={`btn-Secondary`} onClick={onClick} disabled={disabled}>{title}</button>
  );
};
export default BtnSecondary;

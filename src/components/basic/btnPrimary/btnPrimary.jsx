
import "./btnPrimary.scss"


/**
 * Generates a primary button with a given title, onClick callback, and disabled state
 * @param {string} title - The text to display on the button
 * @param {function} onClick - The callback function when the button is clicked
 * @param {boolean} disabled - Whether the button is disabled or not
 * @param {string} type - The type of button (e.g. "submit", "button", etc.)
 * @returns A button element with the given properties
 */
const BtnPrimary = ({title,onClick,disabled,type, id,labelText}) => {
  return (
    <button aria-label={labelText ? labelText : title} id={id} type={type} className={`btn-Primary`} onClick={onClick} disabled={disabled}>{title}</button>
  );
};
export default BtnPrimary;

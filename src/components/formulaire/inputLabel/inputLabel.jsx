
import "./inputLabel.scss"
/**
 * A component that renders a form label with an input field.
 * This component is used in the Form component to generate the form.
 * @param {string} title The title of the form label
 * @param {ReactNode} input The input field
 * @param {string} htmlFor The id of the input field
 * @returns A React component that represents the form label
 */
const InputLabel = ({title, input, htmlFor}) => {

  return <label htmlFor={htmlFor} className="input-label">
    <span>{title}</span>

    {input}
    </label>
 
};

export default InputLabel;


import "./inputLabel.scss"
const InputLabel = ({title,input, htmlFor}) => {

  return <label htmlFor={htmlFor} className="input-label">
    <span >{title}</span>

    {input}
    </label>
 
};
export default InputLabel;


import "./inputLabel.scss"
const InputLabel = ({title,input}) => {

  return <label className="input-label">
    <span >{title}</span>

    {input}
    </label>
 
};
export default InputLabel;

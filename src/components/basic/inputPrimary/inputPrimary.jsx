
import "./inputPrimary.scss"
const InputPrimary = ({onClick,disabled,type,id}) => {

  return (
    <input id={id} type={type} className={`input-primary`} onClick={onClick} disabled={disabled} />
  );
};
export default InputPrimary;

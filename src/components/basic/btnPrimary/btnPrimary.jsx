
import "./btnPrimary.scss"
const BtnPrimary = ({title,handleClick,disabled,type}) => {

  return (
    <button type={type} className={`btn-Primary`} onClick={handleClick} disabled={disabled}>{title}</button>
  );
};
export default BtnPrimary;


import "./btnPrimary.scss"
const BtnPrimary = ({title,handleClick,disabled}) => {

  return (
    <button className={`btn-Primary`} onClick={handleClick} disabled={disabled}>{title}</button>
  );
};
export default BtnPrimary;

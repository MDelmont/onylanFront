
import "./btnPrimary.scss"
const BtnPrimary = ({title,onClick,disabled,type}) => {

  return (
    <button type={type} className={`btn-Primary`} onClick={onClick} disabled={disabled}>{title}</button>
  );
};
export default BtnPrimary;

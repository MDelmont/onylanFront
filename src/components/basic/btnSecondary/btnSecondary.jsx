
import "./btnSecondary.scss"
const BtnSecondary = ({title,onClick,disabled,type,id}) => {

  return (
    <button id={id} type={type} className={`btn-Secondary`} onClick={onClick} disabled={disabled}>{title}</button>
  );
};
export default BtnSecondary;

import "./btnNavTwo.scss"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {updateActivePage} from "../../../store/navStatusSlice"


const BtnNavTwo = ({title,path,isActive}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleCLickBtnNav = (e) => {
    dispatch(updateActivePage(title))
    navigate(`${path}`)
  }
  return (
    <a className={`btn-Nav-Two ${isActive ? "active" : ''}`} onClick={handleCLickBtnNav}>{title} </a>
  );
};

export default BtnNavTwo;

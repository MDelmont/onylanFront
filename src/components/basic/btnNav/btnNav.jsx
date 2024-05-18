import { useDispatch } from "react-redux";
import "./btnNav.scss"
import { useNavigate } from "react-router-dom";
import {updateActivePage} from "../../../store/navStatusSlice"
const BtnNav = ({title,path,isActive,onClick}) => {

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const handleCLickBtnNav = (e) => {

    dispatch(updateActivePage(title))
    navigate(`${path}`)
  }
  return (
    <a className={`btn-Nav ${isActive ? "active" :''}`} onClick={handleCLickBtnNav}>{title} </a>
  );
};

export default BtnNav;

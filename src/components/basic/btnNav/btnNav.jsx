import { useDispatch } from "react-redux";
import "./btnNav.scss"
import { useNavigate } from "react-router-dom";
import {updateActivePage} from "../../../store/navStatusSlice"




/**
 * BtnNav component
 * @param {string} title - button title
 * @param {string} path - path to navigate to when button is clicked
 * @param {boolean} isActive - is button active or not
 * @param {function} onClick - a function to be called when button is clicked
 * @returns {JSX} a link component with the given title and path
 */
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

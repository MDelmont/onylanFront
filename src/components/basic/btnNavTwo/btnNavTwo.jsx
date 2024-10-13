import "./btnNavTwo.scss"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {updateActivePage} from "../../../store/navStatusSlice"



/**
 * BtnNavTwo component
 * @param {string} title - button title
 * @param {string} path - path to navigate to when button is clicked
 * @param {boolean} isActive - is button active or not
 * @returns {JSX} a link component with the given title and path
 */
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

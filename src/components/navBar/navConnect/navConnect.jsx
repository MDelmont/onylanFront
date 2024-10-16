
import { useEffect, useState } from 'react';
import './navConnect.scss'
import Burger from '../../basic/burger/burger';
import BtnPrimary from '../../basic/btnPrimary/btnPrimary'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {headerChoice} from '../../../config/navConfig'
import { logoutUser} from '../../../store/userSlice'; 
import {  getIsAuthUser} from '../../../store/userSlice';


/**
 * NavConnect component
 * 
 * This component displays a login button if the user is not connected, 
 * otherwise it displays a logout button and a burger menu with links to 
 * different pages of the application.
 * 
 * @param {function} setIsAdmin - A function to set the isAdmin state.
 * @param {boolean} isAdmin - A boolean indicating if the user is an administrator.
 * @returns {ReactElement} The NavConnect component.
 */
const NavConnect = ({setIsAdmin,isAdmin}) => {
    
  const userInfo = useSelector((state) => state.userSliceReducer); 
  const navInfo = useSelector((state) => state.navStatusSliceReducer); 


  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleConnect = () => {
    navigate(`/login`)
  }
  const handledisconnect = () => {
    dispatch(logoutUser())
    .unwrap()
    .then((response) => {
      if(isAdmin){
        navigate(`/games`)
      } else {
        navigate(`/home`)
      }
      
      
    })
    .catch((error) => {

    });
  }

  useEffect ( () => {

      dispatch(getIsAuthUser())
      .unwrap()
      .then(response => {
        setIsAdmin(response.data)
      })
      .catch(error => {
        setIsAdmin(false)
      }  
      )

  },[])

  return (
    <div className="nav-connect">
      
      {userInfo.isConnect && <Burger isAdmin={isAdmin} listMenu={headerChoice} handledisconnect={handledisconnect} activePage={navInfo.activePage}/>}
      {!userInfo.isConnect && <BtnPrimary title={'CONNEXION'} onClick={handleConnect} disabled={false}/>}
      {userInfo.isConnect &&  <p className='disconnect-btn' onClick={handledisconnect}>DÉCONNEXION</p>}
  </div>
  );
};

export default NavConnect;
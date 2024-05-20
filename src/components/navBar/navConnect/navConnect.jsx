
import { useEffect, useState } from 'react';
import './navConnect.scss'
import Burger from '../../basic/burger/burger';
import BtnPrimary from '../../basic/btnPrimary/btnPrimary'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {headerChoice} from '../../../config/navConfig'
import { logoutUser} from '../../../store/userSlice'; 
import {  getIsAuthUser} from '../../../store/userSlice';
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
      navigate(`/home`)
      
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
      {!userInfo.isConnect && <BtnPrimary title={'CONNEXION'} handleClick={handleConnect} disabled={false}/>}
      {userInfo.isConnect &&  <p className='disconnect-btn' onClick={handledisconnect}>DÉCONNEXION</p>}
  </div>
  );
};

export default NavConnect;
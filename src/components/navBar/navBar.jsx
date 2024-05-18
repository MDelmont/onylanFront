import './navBar.scss'
import NavMenu from './navMenu/navMenu'
import NavLogo from './navLogo/navLogo'
import NavConnect from './navConnect/navConnect'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIsAdmin} from '../../store/userSlice'; 
import { updateActivePage} from '../../store/navStatusSlice'; 
import {headerChoice} from '../../config/navConfig'
const NavBar = () => {
  

  const userInfo = useSelector((state) => state.userSliceReducer); 
  const [isAdmin,setIsAdmin] =  useState()
  const dispatch = useDispatch()


  // useEffect ( () => {

  //   if (userInfo.isConnect){
  //     dispatch(getIsAdmin())
  //     .unwrap()
  //     .then(response => {
  //       setIsAdmin(response.data)
  //     })
  //     .catch(error => {
  //       setIsAdmin(false)
  //     }  
  //     )
  //   } else {
  //     setIsAdmin(false)
  //   }
  // },[userInfo.isConnect]
  // )
  // useEffect(() => {
  //   const activePage =  headerChoice.filter(page => page.path ==  window.location.pathname )
  //   if (activePage[0]){
  //     dispatch(updateActivePage(activePage[0].name))
  //   }
    
  // })
  return (
    <nav className="nav-bar-two">
    <NavLogo />
    {<NavMenu isAdmin={isAdmin} />}
    <NavConnect />
</nav>
  );
};

export default NavBar;

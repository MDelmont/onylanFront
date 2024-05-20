import './navBar.scss'
import NavMenu from './navMenu/navMenu'
import NavLogo from './navLogo/navLogo'
import NavConnect from './navConnect/navConnect'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isAdminApi } from '../../service/api/user/userApi';
import { updateActivePage} from '../../store/navStatusSlice'; 
import {headerChoice} from '../../config/navConfig'
import { getIsAuthUser } from '../../store/userSlice';
const NavBar = () => {
  

  const userInfo = useSelector((state) => state.userSliceReducer); 
  const [isAdmin,setIsAdmin] =  useState()
  const dispatch = useDispatch()
  
  useEffect ( () => {

    if (userInfo.isConnect){
      isAdminApi()
      .then(response => {
        setIsAdmin(response.data.data)
      })
      .catch(error => {
        console.log(error)
        setIsAdmin(false)
      }  
      )
    } else {
      setIsAdmin(false)
    }
  },[userInfo.isConnect]
  )
  useEffect(() => {
    const activePage =  headerChoice.filter(page => page.path ==  window.location.pathname )
    if (activePage[0]){
      dispatch(updateActivePage(activePage[0].name))
    }
  },[])
  return (
    <nav className="nav-bar-two">
    <NavLogo />
    {<NavMenu isAdmin={isAdmin} />}
    <NavConnect setIsAdmin={setIsAdmin} isAdmin={isAdmin} />
</nav>
  );
};

export default NavBar;

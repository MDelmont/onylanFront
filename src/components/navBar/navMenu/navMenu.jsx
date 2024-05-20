
import './navMenu.scss'
import BtnNav from '../../basic/btnNav/btnNav'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {headerChoice} from '../../../config/navConfig'


const NavMenu = ({isAdmin}) => {
  const pathname = window.location.pathname

  
  const navInfo = useSelector((state) => state.navStatusSliceReducer); 
  const userInfo = useSelector((state) => state.userSliceReducer); 
  
  return (
    <div className="nav-menu">
      {userInfo.isConnect && headerChoice.map((navItem,index)=> {

        if (navItem.isAdmin && isAdmin || !navItem.isAdmin){
          return <BtnNav  key={index} title={navItem.name} isActive={navInfo.activePage == navItem.name} path={navItem.path} />
        }
       
      })}

  </div>
  );
};

export default NavMenu;

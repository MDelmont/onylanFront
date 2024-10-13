import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAdminApi } from "../../service/api/user/userApi";
import { useDispatch } from "react-redux";
import {updateActivePage} from "../../store/navStatusSlice"

/**
 * Checks if the user is an administrator and redirects to the dashboard if not.
 *
 * @returns {void}
 */
export const IsAdmin = () => {
  console.log("IsAdmin")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    isAdminApi().then(response => {
      if(response.data.data  != true) {
        dispatch(updateActivePage('Tableau de bord'))
        navigate('/dashboard')
      }
    
    }).catch(error => {
      dispatch(updateActivePage('Tableau de bord'))
      navigate('/dashboard')
    })
  },[])
}


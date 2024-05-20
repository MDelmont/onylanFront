import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthApi } from "../../service/api/user/userApi";

export const IsAdmin = () => {

  const navigate = useNavigate();

  useEffect(() => {
    isAuthApi().then(response => {

      if(response.data.data  != true) {
        navigate('/dashbord')
      }
    
    }).catch(error => {
      navigate('/dashbord')
    })
  },[])
}


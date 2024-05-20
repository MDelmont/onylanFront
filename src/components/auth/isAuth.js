import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getIsAuthUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import {updateActivePage} from "../../store/navStatusSlice"
export const  IsAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getIsAuthUser())
      .unwrap()
      .then((response) => {
        console.log(response.data)
        if(response.data != true) {
          dispatch(updateActivePage('Accueil'))
          navigate('/home')
        }
      })
      .catch((error) => {
        dispatch(updateActivePage('Accueil'))
        navigate('/home')
      });
  }, [dispatch]);
};

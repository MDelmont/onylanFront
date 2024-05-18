import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getIsAuthUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

export const  IsAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getIsAuthUser())
      .unwrap()
      .then((response) => {
    
        if(response.data != true) {
          navigate('/home')
        }
      })
      .catch((error) => {
        navigate('/home')
      });
  }, [dispatch]);
};

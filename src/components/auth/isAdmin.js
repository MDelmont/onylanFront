import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getIsAdmin } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";

export const IsAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getIsAdmin())
      .unwrap()
      .then((response) => {
        if(response.data != true) {
          navigate('/dashbord')
        }

      })
      .catch((error) => {

        navigate('/dashbord')
      });
  }, [dispatch]);

};


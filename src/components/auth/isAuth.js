import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getIsAuthUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import {updateActivePage} from "../../store/navStatusSlice"

/**
 * Verifies if the user is logged in. If not, redirects to the home page.
 *
 * @returns {void}
 */
export const  IsAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getIsAuthUser())
      .unwrap()
      .then((response) => {

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

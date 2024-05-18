import React, { useState } from "react";
import "../styles/loginpage.scss";
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/userSlice'; 
import { useNavigate } from "react-router-dom";
import {updateActivePage} from "../store/navStatusSlice"
import {headerChoice} from "../config/navConfig"

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setErrorMessage(null)
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    const pathRedirect = '/dashboard'
    try{  
      dispatch(updateActivePage(headerChoice.filter(page => page.path == pathRedirect )[0].name))

      dispatch(loginUser(formData))
      .unwrap()
      .then((response) => {
        navigate(pathRedirect)
      })
      .catch((error) => {
        // Erreur de connexion
        
          setErrorMessage('Email ou mot de passe invalide');
       
      });
    }catch (errors) {
    }
  
  };

  const dataInput = [

    {htmlFor:"email",title:"Email",type:"email",id:"email",name:"email",value:formData.email, onChange:handleChange},
    {htmlFor:"password",title:"Mot de passe",type:"password",id:"password",name:"password",value:formData.password, onChange:handleChange},
  ]

  return (
    <div className="login-Page">
      <h1>Formulaire de connexion</h1>
      <form onSubmit={handleSubmit}>

      <div className="cont-input">
                
     
       {
          dataInput.map(({htmlFor,title,type,id,name,value,onChange},index) => {
            return  <label key={index} htmlFor={htmlFor}>
                <span>{title + " *"}</span>
                <input
                  type={type}
                  id={id}
                  name={name}
                  value={value}
                  onChange={onChange}
                  placeholder={title}
                />
          </label>
          })
        }
        {errorMessage && <p>{errorMessage}</p>}
       </div>
       
        <button type="submit" >Connexion</button>
      </form>
    </div>
  );
};

export default LoginPage;

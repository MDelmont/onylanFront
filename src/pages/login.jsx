
import "../styles/loginpage.scss";

import InputLabel from '../components/formulaire/inputLabel/inputLabel';
import InputPrimary from '../components/basic/inputPrimary/inputPrimary';

import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/userSlice'; 
import { useNavigate } from "react-router-dom";
import {updateActivePage} from "../store/navStatusSlice"
import {headerChoice} from "../config/navConfig"
import BtnPrimary from '../components/basic/btnPrimary/btnPrimary';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setError] = useState({
    email: '',
    password: '',
    }
  )
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log(value)
    setError({
      ...errors,
      [name]: '',

    })
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    console.log('handleSubmit')
    e.preventDefault();
    const pathRedirect = '/dashboard'
    try{  
     

      dispatch(loginUser(formData))
      .unwrap()
      .then((response) => {
        console.log(response)
         dispatch(updateActivePage(headerChoice.filter(page => page.path == pathRedirect )[0].name))
        navigate(pathRedirect)
      })
      .catch((error) => {
        console.log(error)
          console.log(error)
          setError({
            email:'Email ou mot de passe invalide',
            password:'Email ou mot de passe invalide',
          })
       
      });
    }catch (errors) {
    }
  
  };


  const dataInput = [

    {htmlFor:"email",title:"Email",type:"email",id:"email",name:"email",value:formData.email, onChange:handleChange},
    {htmlFor:"password",title:"Mot de passe",type:"password",id:"password",name:"password",value:formData.password, onChange:handleChange},
  ]


  return (
    <div className="test-Page">
      <h1 className='title'>Formulaire de connexion</h1>
      
      <form className='login-form' onSubmit={handleSubmit}>
      <div className="cont-input">
      {dataInput.map(({htmlFor,title,type,id,name,value,onChange},index) => {

        return <InputLabel htmlFor={htmlFor} key={index} title={title} input={
          <InputPrimary  type={type} id={id} onChange={onChange} value={value} name={name} messageError={errors[name]}/>
        }/> 
      })}
     
        
      </div>
      <BtnPrimary title={'Se connecter'} type={'submit'} onClick={handleSubmit} disabled={formData.email==="" || formData.password===""}/>
      </form>
    </div>
  );
};

export default LoginPage;

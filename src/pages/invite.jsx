import React, { useState } from "react";
import "../styles/invitepage.scss";
import {  messageErrors,constFormulaire } from "../config/config"; 
import axios from 'axios';
import { IsAdmin } from "../components/auth/isAdmin";
import { useNavigate } from "react-router-dom";
import BtnPrimary from "../components/basic/btnPrimary/btnPrimary";
import InputPrimary from "../components/basic/inputPrimary/inputPrimary";
import InputLabel from "../components/formulaire/inputLabel/inputLabel";
const BASE_URL = import.meta.env.VITE_BASE_URL;




/**
 * Page for sending an invitation
 * 
 * @returns {ReactElement} form for sending an invitation
 */
const InvitePage = () => {

  IsAdmin()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: null,
    firstName: null,
  });

  const [errors, setError] = useState({
    name: '',
    firstName: ''
    }
  )

  const requireField = ['name','firstName']


  const handleChange = (e) => {
    const { name, value, files } = e.currentTarget;
    console.log(formData)

    const newValue = name === "photo" ? files[0] ? files[0]: formData.photo: value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };
  const handleBlur = (e) => {
    const { name, value, files } = e.target;

    if(requireField.includes(name) & !isNaN(formData[name])){
      setError({
        ...errors,
        [name]: "Champs obligatoire.",
      });
    } else {
      setError({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let haveError = false;
    let errorstemp = {...errors}
    Object.keys(errors).map((key,index) => {
      if(!isNaN(formData[key])){
        haveError = true
        errorstemp[key] = "Champs obligatoire.";
      }
    })
    if (haveError){
    
      setError(errorstemp)
    } else {
        axios.post(`${BASE_URL}/user/invit`,formData,{withCredentials:true})
      .then(response => {

        navigate('/dashboard')
      
    })
    .catch(error => {
      // Gestion des erreurs
      console.error('Une erreur s\'est produite:', error);
    });
  }
    

  };

  const dataInput = [

    {htmlFor:"name",title:"Nom *",type:"text",id:"name",name:"name",value:formData.name, onChange:handleChange,error : errors.name,onBlur:handleBlur},
    {htmlFor:"firstName",title:"Prénom *",type:"text",id:"firstName",name:"firstName",value:formData.firstName, onChange:handleChange,error : errors.firstName,onBlur:handleBlur},
  ]


  return (
    <div className="invite-Page">
      
      <h1>Formulaire d'invitation</h1>
       <form onSubmit={handleSubmit}>

      <div className="cont-input">
      {dataInput && dataInput.map((input, index) => (
        <InputLabel
          key={input.id}
          htmlFor={input.htmlFor}
          title={input.title}
          input={
            <InputPrimary
              type={input.type}
              id={input.id}
              onChange={input.onChange}
              onBlur={input.onBlur}
              value={input.value}
              name={input.name}
              messageError={input.error}
            />
          }
        />
      ))}
      </div>

       <BtnPrimary labelText={"Creation de l'invitation"} title="Créer" disabled={  Object.values(errors).some(error => error !== '')} onClick={handleSubmit} type="submit" />
  
      </form>

    
    </div>
  );
};

export default InvitePage;
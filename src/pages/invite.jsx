import React, { useState } from "react";
import "../styles/invitepage.scss";
import {  messageErrors } from "../config/config"; 
import VerifForm from "../components/formulaire/verifForm";
import axios from 'axios';
import { IsAdmin } from "../components/auth/isAdmin";
import { useNavigate } from "react-router-dom";

const InvitePage = () => {
  IsAdmin()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    firstName: '',
  });

  const requireField = ['name','firstName']
  const conditions =  [
   
    { key: 'allFieldFilled', message: messageErrors.allFieldFilled, condition:  !requireField.every(field => {const value = formData[field]; return value !== null && value !== undefined && value.trim() !== ''})},

];
  const handleChange = (e) => {
    const { name, value, files } = e.currentTarget;
    console.log(formData)

    const newValue = name === "photo" ? files[0] ? files[0]: formData.photo: value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/user/invit",formData,{withCredentials:true})
    .then(response => {

      navigate('/invite/list')
    })
    .catch(error => {
      // Gestion des erreurs
      console.error('Une erreur s\'est produite:', error);
    });

  };

  const dataInput = [

    {htmlFor:"name",title:"Nom *",type:"text",id:"name",name:"name",value:formData.name, onChange:handleChange},
    {htmlFor:"firstName",title:"Prénom *",type:"text",id:"firstName",name:"firstName",value:formData.firstName, onChange:handleChange},
  ]


  return (
    <div className="invite-Page">
      
      <h1>Formulaire d'invitation</h1>
       <form onSubmit={handleSubmit}>

      <div className="cont-input">

       {
          dataInput.map(({htmlFor,title,type,id,name,value,onChange,placeholder},index) => {
            return  <label key={index} htmlFor={htmlFor}>
                <span>{title}</span>
                <input
                  type={type}
                  id={id}
                  name={name}
                  value={value}
                  onChange={onChange}
                  placeholder={id =="budget" ? placeholder:title}
                />
        
          </label>
          })
        }
   
    
       </div>

        <VerifForm conditions={conditions} />
       
        <button type="submit" className="btn-submit" disabled={!conditions.every(item => !item.condition)}>Invitation</button>
      </form>

    
    </div>
  );
};

export default InvitePage;
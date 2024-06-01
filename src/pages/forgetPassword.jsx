import React, { useState } from "react";
import "../styles/forgetPassword.scss";
import BtnPrimary from "../components/basic/btnPrimary/btnPrimary";
import InputLabel from "../components/formulaire/inputLabel/inputLabel";
import InputPrimary from "../components/basic/inputPrimary/inputPrimary";
import { constFormulaire, messageErrors } from "../config/config";

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setError] = useState({
    email: '',
    }
  )
  const [globalMessage, setGlobalMessage] = useState('')
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setError({
      ...errors,
      [name]: '',

    })
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name, value, files } = e.target;
    let msgError='';
    if (name=="email" && !constFormulaire.regexEmail.test(value) && value) {
  
   
        msgError = messageErrors.regexEmail
      
    }
    setError({
      ...errors,
      [name]: msgError,
    });
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (true){
        console.log("todashboard")
    }

  };

  const dataInput = [

    {htmlFor:"email",title:"Email",type:"email",id:"email",name:"email",value:formData.email, onChange:handleChange,error:errors.email, onBlur:handleBlur},
  ]

  return (
    <div className="forgetPassword-page">
      <h1>Formulaire d'inscription</h1>
      <form >

        <div className="cont-input">
                

        {dataInput.map(({htmlFor,title,type,id,name,value,onChange,error,onBlur},index) => {
        console.log("name",name)
        console.log(['name','firstname'].includes(name))
        return <InputLabel htmlFor={htmlFor} key={index} title={title} input={
          <InputPrimary type={type} id={id} onChange={onChange} value={value} name={name} messageError={error} onBlur={onBlur} />
        }/> 
      })}
        </div>
        {globalMessage && <p>{globalMessage}</p>}

        <BtnPrimary title={'Se connecter'} type={'submit'} onClick={handleSubmit} disabled={formData.email==="" || formData.password===""} />
      </form>
    </div>
  );
};

export default ForgetPassword;

import React, { useState } from "react";
import "../styles/forgetPassword.scss";

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (true){
        console.log("todashboard")
    }

  };

  const dataInput = [

    {htmlFor:"email",title:"Email",type:"email",id:"email",name:"email",value:formData.email, onChange:handleChange},
  ]

  return (
    <div className="forgetPassword-page">
      <h1>Formulaire d'inscription</h1>
      <form onSubmit={handleSubmit}>

        <div className="cont-input">
                

          {
              dataInput.map(({htmlFor,title,type,id,name,value,onChange},index) => {
                return  <label key={index} htmlFor={htmlFor}>
                    <span>{title + " :"}</span>
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
        </div>
       
        <button type="submit" >Valider</button>
      </form>
    </div>
  );
};

export default ForgetPassword;

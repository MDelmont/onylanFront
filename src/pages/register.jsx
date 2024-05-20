import React, { useEffect, useState } from "react";
import "../styles/registerpage.scss";
import { constFormulaire, messageErrors } from "../config/config"; 
import VerifForm from "../components/formulaire/verifForm";
import Checkbox from "../components/basic/checkBox/checkBox";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import utilsFunction from '../utils/utilsFunction'
import BtnPrimary from "../components/basic/btnPrimary/btnPrimary";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    lastName: '',
    firstName: '',
    pseudo: '',
    password:'',
    confirmPassword: '',
    file: null,
    budget:'80-100',
    token:'',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const { idToken } = useParams();
  const requireField = ['email','lastName','firstName','pseudo','password','confirmPassword','budget']

  const conditions =  [

    { key: 'regexEmail', message: messageErrors.regexEmail, condition: !constFormulaire.regexEmail.test(formData.email) },
    { key: 'passwordSize', message: messageErrors.passwordSize, condition: formData.password.length < constFormulaire.passwordSize },
    { key: 'majRegex', message: messageErrors.majRegex, condition: !constFormulaire.majRegex.test(formData.password) },
    { key: 'minRegex', message: messageErrors.minRegex, condition: !constFormulaire.minRegex.test(formData.password) },
    { key: 'digitRegex', message: messageErrors.digitRegex, condition: !constFormulaire.digitRegex.test(formData.password) },
    { key: 'specialCharRegex', message: messageErrors.specialCharRegex, condition: !constFormulaire.specialCharRegex.test(formData.password) },
    { key: 'samePassword', message: messageErrors.samePassword, condition: !(formData.password == formData.confirmPassword && formData.password.length >0 && formData.confirmPassword.length >0)},
    { key: 'allFieldFilled', message: messageErrors.allFieldFilled, condition:  !requireField.every(field => {const value = formData[field]; return value !== null && value !== undefined && value.trim() !== ''})},
    

];

  useEffect(() => {
    console.log('token : ' , idToken)
    setFormData({...formData,token:idToken})


    axios.get(`http://localhost:5000/user/invit/${idToken}`,formData).then( resp => {
 
      if(!resp.data.data.invitation){
    
        navigate('/home');

      }
      if(resp.data.data.user){
        console.log(resp.data.data.user)
        setFormData({...formData,...resp.data.data.user,token:idToken})

      }
      
   
    }).catch(error =>{
      console.log(error)
      navigate('/home');
    })
  },[])

  const handleChange = (e) => {
    const { name, value, files } = e.currentTarget;
    const newValue = name === "file" ? files[0] ? files[0]: formData.file: value;
    setErrorMessage(null)
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const resetPhoto = (e) => {
    e.preventDefault()
    setFormData({
      ...formData,
      file: null,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`http://localhost:5000/auth/register/${formData.token}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data', // Assurez-vous de définir le type de contenu comme 'multipart/form-data'
        }
      }).then((response) => {
     
        navigate("/login")

      })
      .catch((error) => {
        // Erreur de connexion
        const errors = error?.response?.data?.data?.errors
        if (errors) {
          console.log(errors)  
          console.log(utilsFunction.createErrorMessage(errors))
          setErrorMessage(utilsFunction.createErrorMessage(errors));
        }
       
  

      });

  };

  const dataInput = [

    {htmlFor:"email",title:"Email *",type:"email",id:"email",name:"email",value:formData.email, onChange:handleChange},
    {htmlFor:"lastName",title:"Nom *",type:"text",id:"lastName",name:"lastName",value:formData.lastName,disabled:true, onChange:handleChange},
    {htmlFor:"firstName",title:"Prénom *",type:"text",id:"firstName",name:"firstName",disabled:true,value:formData.firstName, onChange:handleChange},
    {htmlFor:"pseudo",title:"Pseudo *",type:"text",id:"pseudo",name:"pseudo",value:formData.pseudo, onChange:handleChange},
    {htmlFor:"password",title:"Mot de passe *",type:"password",id:"password",name:"password",value:formData.password, onChange:handleChange},
    {htmlFor:"confirmPassword",title:"Confirmer *",type:"password",id:"confirmPassword",name:"confirmPassword",value:formData.confirmPassword, onChange:handleChange},
   
   
  ]
  const dataBudget = [
    {htmlFor:"budget1",title:"20€ - 40€",type:"radio",id:"budget1",name:"budget",value:"20-40", placeholder:"20€ - 40€", onChange:handleChange},
    {htmlFor:"budget2",title:"40€ - 60€",type:"radio",id:"budget2",name:"budget",value:"40-60", placeholder:"40€ - 60€", onChange:handleChange},
    {htmlFor:"budget3",title:"60€ - 80€",type:"radio",id:"budget3",name:"budget",value:"60-80", placeholder:"60€ - 80€", onChange:handleChange},
    {htmlFor:"budget4",title:"80€ - 100€",type:"radio",id:"budget4",name:"budget",value:"80-100", placeholder:"80€ - 100€", onChange:handleChange},
  ]

  return (
    <div className="register-Page">
      <h1>Formulaire d'inscription</h1>
      <form onSubmit={handleSubmit}>

      <div className="cont-input">


        <label htmlFor="photo">
          <span>Photo</span>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleChange}
           
          />
           {!formData.file && <button onClick={() => document.getElementById('file').click()}>Choisir un fichier</button>}
           {formData.file && (
          <div> 
            <img
            src={URL.createObjectURL(formData.file)}
            alt="Uploaded"
            style={{ maxWidth: "100px", maxHeight: "100px" }}
          />  
          {formData.file &&<button onClick={resetPhoto}>Supprimer la photo</button>}
            
          </div>
          
         
        )}
        </label>
        
        
       

       {
          dataInput.map(({htmlFor,title,type,id,name,value,onChange,placeholder,disabled},index) => {
            return  <label key={index} htmlFor={htmlFor}>
                <span>{title}</span>
                <input
                  type={type}
                  id={id}
                  name={name}
                  value={value}
                  onChange={onChange}
                  placeholder={title}
                  disabled={disabled}
                />
        
          </label>
          })
        }
        <br />
        <span>Budget</span>
        <br />
        <div className="budget-form" >
        {
          dataBudget.map(({htmlFor,title,type,id,name,value,onChange,placeholder},index) => {
            return  <label key={index} htmlFor={htmlFor}>
                <Checkbox isCheck={formData.budget == value} onClick={() => document.getElementById(id).click()} />
                <input
                  type={type}
                  id={id}
                  name={name}
                  value={value}
                  onChange={onChange}
                  placeholder={id =="budget" ? placeholder:title}
                  style={{display:"none"}}
                />
                <label key={index} htmlFor={htmlFor}>{title} </label>
          </label>
          })
        }
        </div>
       </div>
        
       {errorMessage && <p>{errorMessage}</p>}
       
        <VerifForm conditions={conditions} />
        <BtnPrimary title={'INSCRIPTION'} type={"submit"} disabled={!conditions.every(item => !item.condition)} />
       
      </form> 
    </div>
  );
};

export default RegisterPage;
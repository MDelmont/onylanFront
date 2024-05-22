

import '../styles/testPage.scss'
import BtnSecondary from '../components/basic/btnSecondary/btnSecondary';
import InputLabel from '../components/formulaire/inputLabel/inputLabel';
import InputPrimary from '../components/basic/inputPrimary/inputPrimary';
import { constFormulaire, messageErrors,rulesMessage } from "../config/config"; 

import { useDispatch } from 'react-redux';
import { loginUser } from '../store/userSlice'; 
import { useNavigate } from "react-router-dom";
import {updateActivePage} from "../store/navStatusSlice"
import {headerChoice} from "../config/navConfig"
import { useState } from 'react';
import BtnPrimary from '../components/basic/btnPrimary/btnPrimary';
import Checkbox from '../components/basic/checkBox/checkBox';



const TestPage = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const [errors, setError] = useState({
    email: '',
    lastName: '',
    firstName: '',
    pseudo: '',
    password:'',
    confirmPassword: '',
    file: '',
    budget:'',
    token:'',
    }
  )
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === "file" ? files[0] ? files[0]: formData.file: value;
    setError({
      ...errors,
      [name]: '',

    })
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };
  const resetPhoto = (e) => {
    document.getElementById('file').value = '';

    setFormData({
      ...formData,
      file: null,
    });
  }
  const handleBlur = (e) => {
    const { name, value, files } = e.target;
    let msgError='';
    if (name=="email" && !constFormulaire.regexEmail.test(value) && value) {
  
   
        msgError = messageErrors.regexEmail
      
    }
    

    if (name=="password" 
     && (constFormulaire.passwordSize > value.length
     || !constFormulaire.majRegex.test(value)
     || !constFormulaire.minRegex.test(value) 
     || !constFormulaire.digitRegex.test(value)
     || !constFormulaire.specialCharRegex.test(value))
     ) {

      console.log('invalid password ')
      msgError = messageErrors.password
    
  }

  if (value  && name=="confirmPassword" 
      && formData.password != value ) {
        
      console.log('invalid confirmPassword ')
      msgError = messageErrors.confirmPassword
    
  }

    setError({
      ...errors,
      [name]: msgError,
    });
   
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit')
    const errorstemp = {
      email: '',
      lastName: '',
      firstName: '',
      pseudo: '',
      password:'',
      confirmPassword: '',
      file: '',
      budget:'',
      token:'',
      };
    let haveError= false;
    if (!constFormulaire.regexEmail.test( formData.password.email) && formData.password.email) {
      haveError = true
      errorstemp['email'] = messageErrors.regexEmail
    
  }

  
  if (!constFormulaire.passwordSize > formData.password.length
    || !constFormulaire.majRegex.test( formData.password)
    || !constFormulaire.minRegex.test( formData.password) 
    || !constFormulaire.digitRegex.test( formData.password)
    || !constFormulaire.specialCharRegex.test( formData.password)
    ) {
      haveError = true
      errorstemp['password'] = messageErrors.password
    }

  if (formData.confirmPassword != formData.password ) {
      haveError = true
      errorstemp['confirmPassword'] = messageErrors.confirmPassword
 
  }

  Object.keys(errors).map((key,index) => {
    if(!['token','file'].includes(key) & !isNaN(formData[key])){
      haveError = true
      errorstemp[key] = "Champs obligatoire.";
    }
  })
  if (haveError){
    setError(errorstemp)
    return false
  }

    // axios.post(`http://localhost:5000/auth/register/${formData.token}`, formData, {
    //     withCredentials: true,
    //     headers: {
    //       'Content-Type': 'multipart/form-data', // Assurez-vous de définir le type de contenu comme 'multipart/form-data'
    //     }
    //   }).then((response) => {
     
    //     navigate("/login")

    //   })
    //   .catch((error) => {
    //     // Erreur de connexion
    //     const errors = error?.response?.data?.data?.errors
    //     if (errors) {
    //       console.log(errors)  
    //       console.log(utilsFunction.createErrorMessage(errors))
    //       setErrorMessage(utilsFunction.createErrorMessage(errors));
    //     }
       
  

    //   });

  };
  const dataInput = [

    {htmlFor:"email",title:"Email *",type:"email",id:"email",name:"email",value:formData.email, onChange:handleChange,error:errors.email,onBlur:handleBlur},
    {htmlFor:"lastName",title:"Nom *",type:"text",id:"lastName",name:"lastName",value:formData.lastName,disabled:true, onChange:handleChange,error:errors.lastName,onBlur:handleBlur},
    {htmlFor:"firstName",title:"Prénom *",type:"text",id:"firstName",name:"firstName",disabled:true,value:formData.firstName, onChange:handleChange,error:errors.firstName,onBlur:handleBlur},
    {htmlFor:"pseudo",title:"Pseudo *",type:"text",id:"pseudo",name:"pseudo",value:formData.pseudo, onChange:handleChange,error:errors.pseudo,onBlur:handleBlur},
    {htmlFor:"password",title:"Mot de passe *",type:"password",id:"password",name:"password",value:formData.password, onChange:handleChange,error:errors.password,onBlur:handleBlur},
    {htmlFor:"confirmPassword",title:"Confirmer *",type:"password",id:"confirmPassword",name:"confirmPassword",value:formData.confirmPassword, onChange:handleChange,error:errors.confirmPassword,onBlur:handleBlur},
   
   
  ]
  const dataBudget = [
    {htmlFor:"budget1",title:"20€ - 40€",type:"radio",id:"budget1",name:"budget",value:"20-40", placeholder:"20€ - 40€", onChange:handleChange},
    {htmlFor:"budget2",title:"40€ - 60€",type:"radio",id:"budget2",name:"budget",value:"40-60", placeholder:"40€ - 60€", onChange:handleChange},
    {htmlFor:"budget3",title:"60€ - 80€",type:"radio",id:"budget3",name:"budget",value:"60-80", placeholder:"60€ - 80€", onChange:handleChange},
    {htmlFor:"budget4",title:"80€ - 100€",type:"radio",id:"budget4",name:"budget",value:"80-100", placeholder:"80€ - 100€", onChange:handleChange},
  ]



  return (
    <div className="test-Page">
      <h1 className='title'>Formulaire d'inscription</h1>
      
      <form className='register-form' onSubmit={handleSubmit}>
      <div className="cont-input">

      <InputLabel  htmlFor={"photo"}  title={"Photo"} input={
      <div className='cont-img-input'>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleChange}
           
          />
          
           {!formData.file && <BtnSecondary type={"button"} title={"Choisir un fichier"} onClick={() => {
            resetPhoto()
            document.getElementById('file').click()}}/>}
           {formData.file && (
            <div className='img-del'> 
          
                <img
                src={URL.createObjectURL(formData.file)}
                alt="Uploaded"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />  
              {formData.file && <BtnSecondary title={"Supprimer la photo"} onClick={resetPhoto} />}
              
            </div>
         
        )}
        </div>
        } />

      {dataInput.map(({htmlFor,title,type,id,name,value,onChange,error,onBlur},index) => {

        return <InputLabel htmlFor={htmlFor} key={index} title={title} input={
          <InputPrimary infoInput={name=="password" ? rulesMessage[name]:null} type={type} id={id} onChange={onChange} value={value} name={name} messageError={error} onBlur={onBlur} />
        }/> 
      })}

      <div className="budget-form" >
      <InputLabel   title={"Budget"} input={
        
        <div className='budget-choise'>
          {dataBudget.map(({htmlFor,title,type,id,name,value,onChange,placeholder},index) => {
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
                <span key={index} htmlFor={htmlFor}>{title} </span>
          </label>
          })}
                </div>
      } />
        </div>
     
        
      </div>
      <BtnPrimary title={'Se connecter'} type={'submit'} onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default TestPage;

import React, { useEffect, useState } from "react";
import "../styles/registerpage.scss";
import BtnSecondary from '../components/basic/btnSecondary/btnSecondary';
import InputLabel from '../components/formulaire/inputLabel/inputLabel';
import InputPrimary from '../components/basic/inputPrimary/inputPrimary';
import { constFormulaire, messageErrors,rulesMessage ,messageErrorsReturnApi} from "../config/config";
import Checkbox from "../components/basic/checkBox/checkBox";
import { useNavigate, useParams } from "react-router-dom";
import BtnPrimary from "../components/basic/btnPrimary/btnPrimary";
import { invitationByToken } from "../service/api/user/initationApi";
import { registerApi } from "../service/api/auth/registerApi";


/**
 * RegisterPage is a component that allows users to register on the website.
 *
 * The component takes care of the entire registration process, from the initial
 * form submission to the final redirect to the login page.
 *
 * The component uses the following state variables:
 *
 * - formData: an object containing the user's input data
 * - errors: an object containing any errors encountered during the registration
 *          process
 * - globalError: a string containing any global errors encountered during the
 *                registration process
 *
 * The component uses the following functions:
 *
 * - handleChange: a function that updates the formData state variable when the
 *                 user inputs data into the form
 * - handleBlur: a function that checks for errors when the user leaves a form
 *               field
 * - handleSubmit: a function that handles the form submission
 * - resetPhoto: a function that resets the file input field
 *
 * The component renders a form with the following fields:
 *
 * - email
 * - name
 * - first name
 * - pseudo
 * - password
 * - confirm password
 * - photo
 * - budget
 *
 * The component also renders a button to submit the form.
 */
const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
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
    name: '',
    firstName: '',
    pseudo: '',
    password:'',
    confirmPassword: '',
    file: '',
    budget:'',
    token:'',
    }
  )
  const [globalError , setGlobalError] = useState('')
  const { idToken } = useParams();
  // request fo get user with token
  useEffect(() => {

    setFormData({...formData,token:idToken})

    invitationByToken(idToken).then( resp => {
 
      if(!resp.data.data.invitation){
    
        navigate('/home');

      }
      if(resp.data.data.user){
        setFormData({...formData,...resp.data.data.user,token:idToken})

      }
      
   
    }).catch(error =>{
      console.log(error)
      navigate('/home');
    })
  },[])


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === "file" ? files[0] ? files[0]: formData.file: value;
    setGlobalError("")
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
    console.log(formData)
    const errorstemp = {
      email: '',
      name: '',
      firstName: '',
      pseudo: '',
      password:'',
      confirmPassword: '',
      file: '',
      budget:'',
      token:'',
      };
    let haveError= false;
    if (!constFormulaire.regexEmail.test( formData.email) && formData.email) {
      haveError = true
      errorstemp['email'] = messageErrors.regexEmail
    
  }

  
  if (!constFormulaire.passwordSize > formData.password?.length
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
  registerApi(formData.token,formData).then((response) => {
        navigate("/login")
      })
      .catch((error) => {
        // Erreur de connexion
        const {message,data} = error.response.data
   
        if (message == "Invalid data for register"){
          console.log('is invalid data register')
          const errorsApi = data.errors
          const errorsTemp = {...errors}
          errorsApi.forEach(error => {
            if(Object.keys(messageErrorsReturnApi).includes(error)){
              const {target,message} =messageErrorsReturnApi[error]
              errorsTemp[target] = message
            }

          })
          setError(errorsTemp)
        } else {
          setGlobalError("Une erreur c'est produite")
        }


      });

  };
  const dataInput = [

    {htmlFor:"email",title:"Email *",type:"email",id:"email",name:"email",value:formData.email, onChange:handleChange,error:errors.email,onBlur:handleBlur},
    {htmlFor:"name",title:"Nom *",type:"text",id:"name",name:"name",value:formData.name,disabled:true, onChange:handleChange,error:errors.name,onBlur:handleBlur},
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
    <div className="register-Page">
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
          <InputPrimary infoInput={name=="password" ? rulesMessage[name]:null} type={type} id={id} onChange={onChange} value={value} name={name} messageError={error} onBlur={onBlur} disabled={['name','firstName'].includes(name)} />
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
     
        {globalError && <p>{globalError}</p>}
      </div>
      <BtnPrimary labelText={"Inscription au site internet"} title={"S'INSCRIRE"} type={'submit'} onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default RegisterPage;
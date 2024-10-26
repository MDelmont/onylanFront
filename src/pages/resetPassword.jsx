import React, { useEffect, useState } from "react";
import "../styles/resetPassword.scss";
import BtnPrimary from "../components/basic/btnPrimary/btnPrimary";
import InputLabel from "../components/formulaire/inputLabel/inputLabel";
import InputPrimary from "../components/basic/inputPrimary/inputPrimary";
import { constFormulaire, messageErrors, messageErrorsReturnApi } from "../config/config";
import { postResetPasswordToken, getResetPassword } from "../service/api/auth/resetPasswordApi";
import { useNavigate, useParams } from "react-router-dom";


/**
 * Page for reset password
 * @returns {React.ReactElement} page for reset password
 */
const ResetPasswordPage = () => {
 
  const [formData, setFormData] = useState({
    password:'',
    confirmPassword:'',
  });

  const [errors, setError] = useState({
    password:'',
    confirmPassword:'',
    }
  )
  const [globalMessage , setGlobalMessage] = useState('')

  const { idToken } = useParams();
  const navigate = useNavigate()
  useEffect(() => {

    getResetPassword(idToken)

    .then(response => {

    }).catch(error => {
      navigate("/home")
    })
  },[])
  const handleChange = (e) => {
    const { name, value, files } = e.target;

      const newValue = value;
      setGlobalMessage("");
      setError((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
      setFormData((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    }
  
    const handleBlur = (e) => {
      const { name, value, files } = e.target;
      let msgError='';
      

      
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

  const handleSubmit  = (e) => {
    e.preventDefault()
    let errorsTemp = {
      password:'',
      newPassword:'',
      confirmPassword:'',
      }
    let haveError= false;
  

  
  if (constFormulaire.passwordSize > formData.password.length
  || !constFormulaire.majRegex.test(formData.password)
  || !constFormulaire.minRegex.test(formData.password) 
  || !constFormulaire.digitRegex.test(formData.password)
  || !constFormulaire.specialCharRegex.test(formData.password)
  ) {
      haveError = true
      errorsTemp['password'] = messageErrors.password
    }

  if (formData.confirmPassword != formData.password ) {
      haveError = true
      errorsTemp['confirmPassword'] = messageErrors.confirmPassword
 
  }

  Object.keys(errors).map((key) => {
      if( !isNaN(formData[key])){
        haveError = true
        errorsTemp[key] = "Champs obligatoire.";
      }
    })

    if (haveError){
      setError(errorsTemp)
      return false
    }

    postResetPasswordToken(idToken,formData).then(response => {

      setGlobalMessage('Le mot de passe à bien été changé.')
      setTimeout(() => {
        navigate('/login')
      },3000)
    }).catch(error => {
      console.log(error)

      const {message,data} = error.response.data
      if (message == "Invalid password"){
        const errorsApi = data.errors
        errorsTemp = {...errors}
        errorsApi.forEach(error => {
           if(Object.keys(messageErrorsReturnApi).includes(error)){
            const {target,message} =messageErrorsReturnApi[error]
            errorsTemp[target] = message
          }
        })
        setError(errorsTemp)
      } else if  (message == "Passwords do not match"){
        errorsTemp.confirmPassword = messageErrors.confirmPassword
        setError(errorsTemp)
      } else {
        setGlobalMessage('Une erreur est survenu.')
      }
    })
}


const dataInput = [

  {htmlFor:"password",title:"Nouveau mot de passe *",type:"password",id:"password",name:"password",value:formData.password,disabled:true, onChange:handleChange,error:errors.password,onBlur:handleBlur},
  {htmlFor:"confirmPassword",title:"Confirmer le mot de passe *",type:"password",id:"confirmPassword",name:"confirmPassword",disabled:true,value:formData.confirmPassword, onChange:handleChange,error:errors.confirmPassword,onBlur:handleBlur},

 
]
  return (
    <div className="reset-password-page">
      <h1>Réinitialisation du mot de passe</h1>
      <form >

        <div className="cont-input">
                

        {dataInput.map(({htmlFor,title,type,id,name,value,onChange,error,onBlur},index) => {

        return <InputLabel htmlFor={htmlFor} key={index} title={title} input={
          <InputPrimary type={type} id={id} onChange={onChange} value={value} name={name} messageError={error} onBlur={onBlur} />
        }/> 
      })}
        </div>
        {globalMessage && <p>{globalMessage}</p>}

        <BtnPrimary labelText={"Réinitialiser le mot de passe"} title={'Appliquer'} type={'submit'} onClick={handleSubmit} disabled={formData.email==="" || formData.password===""} />
      </form>
    </div>
  );
};

export default ResetPasswordPage;

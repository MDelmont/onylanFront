import './passwordChangeForm.scss'
import InputLabel from "../inputLabel/inputLabel";
import InputPrimary from "../../basic/inputPrimary/inputPrimary";
import BtnPrimary from "../../basic/btnPrimary/btnPrimary";
import Checkbox from "../../basic/checkBox/checkBox";
import { useEffect, useState } from "react";
import { userAuth } from '../../../service/api/user/userApi';
import { constFormulaire, messageErrors, messageErrorsReturnApi, rulesMessage } from '../../../config/config';
import { resetPassword } from '../../../service/api/auth/resetPasswordApi';

/**
 * Component Form to change password
 * 
 * @param {Object} props - Properties component
 * @returns {ReactElement} - Component Form
 */
const PasswordChangeForm = ({}) => {

  const [formData, setFormData] = useState({
    password:'',
    newPassword:'',
    confirmPassword:'',
  });

  const [errors, setError] = useState({
    password:'',
    newPassword:'',
    confirmPassword:'',
    }
  )
  const [globalMessage , setGlobalMessage] = useState('')



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
      

      
      if (name=="newPassword" 
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
        && formData.newPassword != value ) {
          
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
  

  
  if (constFormulaire.passwordSize > formData.newPassword.length
  || !constFormulaire.majRegex.test(formData.newPassword)
  || !constFormulaire.minRegex.test(formData.newPassword) 
  || !constFormulaire.digitRegex.test(formData.newPassword)
  || !constFormulaire.specialCharRegex.test(formData.newPassword)
  ) {
      haveError = true
      errorsTemp['newPassword'] = messageErrors.password
    }

  if (formData.confirmPassword != formData.newPassword ) {
      haveError = true
      errorsTemp['confirmPassword'] = messageErrors.confirmPassword
 
  }

  Object.keys(errors).map((key) => {
      if( !isNaN(formData[key])){
        haveError = true
        errorsTemp[key] = "Champs obligatoire.";
      }
    })
    console.log(errorsTemp)
    if (haveError){
      setError(errorsTemp)
      return false
    }

    resetPassword(formData).then(response => {

      console.log(response.data)
      setGlobalMessage('Le mot de passe à bien été changé.')

    }).catch(error => {
      console.log(error)

      const {message,data} = error.response.data
      console.log(message,data)
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

    {htmlFor:"password",title:"Mot de passe *",type:"password",id:"password",name:"password",value:formData.password, onChange:handleChange,error:errors.password,onBlur:handleBlur},
    {htmlFor:"newPassword",title:"Nouveau mot de passe *",type:"password",id:"newPassword",name:"newPassword",value:formData.newPassword,disabled:true, onChange:handleChange,error:errors.newPassword,onBlur:handleBlur},
    {htmlFor:"confirmPassword",title:"Confirmer le mot de passe *",type:"password",id:"confirmPassword",name:"confirmPassword",disabled:true,value:formData.confirmPassword, onChange:handleChange,error:errors.confirmPassword,onBlur:handleBlur},

   
  ]

  return  <form className="password-form" action="">

   
    
      <div className="from-info">
    
        
        {dataInput.map(({htmlFor,title,type,id,name,value,onChange,error,onBlur},index) => {

        return <InputLabel htmlFor={htmlFor} key={index} title={title} input={
          <InputPrimary infoInput={name=="password" || name=="newPassword"? rulesMessage.password:null} type={type} id={id} onChange={onChange} value={value} name={name} messageError={error} onBlur={onBlur} disabled={['name','firstName'].includes(name)} />
        }/> 
        })}
   
 
      </div>
        {globalMessage && <p>{globalMessage}</p>}
      <BtnPrimary labelText={"Modifier les mot de passe"} title={'Modifier'} type={'submit'} onClick={handleSubmit} />
    </form>


};
export default PasswordChangeForm;

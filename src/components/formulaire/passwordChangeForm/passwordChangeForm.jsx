import './passwordChangeForm.scss'
import InputLabel from "../inputLabel/inputLabel";
import InputPrimary from "../../basic/inputPrimary/inputPrimary";
import BtnPrimary from "../../basic/btnPrimary/btnPrimary";
import Checkbox from "../../basic/checkBox/checkBox";
import { useEffect, useState } from "react";
import { userAuth } from '../../../service/api/user/userApi';
import { rulesMessage } from '../../../config/config';
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
  const [globalError , setGlobalError] = useState('')



  const handleChange = (e) => {
    const { name, value, files } = e.target;

      const newValue = value;
      setGlobalError("");
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
   
   
  };

  const handleSubmit  = (e) => {
    e.preventDefault()
    console.log(formData)
  }
  const dataInput = [

    {htmlFor:"password",title:"Mot de passe *",type:"password",id:"password",name:"password",value:formData.password, onChange:handleChange,error:errors.password,onBlur:handleBlur},
    {htmlFor:"newPassword",title:"Nouveau mot de passe *",type:"password",id:"newPassword",name:"newPassword",value:formData.newPassword,disabled:true, onChange:handleChange,error:errors.newPassword,onBlur:handleBlur},
    {htmlFor:"confirmPassword",title:"Confirmer le mot de passe *",type:"password",id:"confirmPassword",name:"confirmPassword",disabled:true,value:formData.confirmPassword, onChange:handleChange,error:errors.confirmPassword,onBlur:handleBlur},

   
  ]

  return  <form className="password-form" action="">

   
    
      <div className="from-info">
    
        
        {dataInput.map(({htmlFor,title,type,id,name,value,onChange,error,onBlur},index) => {
        console.log("name",name)
        console.log(['name','firstname'].includes(name))
        return <InputLabel htmlFor={htmlFor} key={index} title={title} input={
          <InputPrimary infoInput={name=="password" || name=="newPassword"? rulesMessage.password:null} type={type} id={id} onChange={onChange} value={value} name={name} messageError={error} onBlur={onBlur} disabled={['name','firstName'].includes(name)} />
        }/> 
        })}
   
 
      </div>
      
      <BtnPrimary title={'Modifier'} type={'submit'} onClick={handleSubmit} />
    </form>


};
export default PasswordChangeForm;

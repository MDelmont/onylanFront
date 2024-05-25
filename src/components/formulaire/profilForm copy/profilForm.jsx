import './profilForm.scss'
import InputLabel from "../inputLabel/inputLabel";
import InputPrimary from "../../basic/inputPrimary/inputPrimary";
import BtnPrimary from "../../basic/btnPrimary/btnPrimary";
import Checkbox from "../../basic/checkBox/checkBox";
import { useEffect, useState } from "react";
import { userAuth } from '../../../service/api/user/userApi';
const ProfilForm = ({}) => {

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    firstName: '',
    pseudo: '',
    password:'',
    confirmPassword: '',
    file: null,
    budget:'80-100',
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
    }
  )
  const [globalError , setGlobalError] = useState('')



  
  useEffect(() => {
    console.log('userAuth')
    userAuth().then( resp => {
      console.log(resp.data.data)
      if(resp.data.data){
        
        setFormData({...formData,...resp.data.data})

      }
      
   
    }).catch(error =>{
      console.log(error)
      setGlobalError("Un erreur c'est produite")
    })
  },[])

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file" && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFormData((prevData) => ({
          ...prevData,
          [name]: base64String,
        }));
      };
      reader.readAsDataURL(file); // Read file as data URL
    } else {
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
  };
  const handleBlur = (e) => {
   
   
  };

  const handleSubmit  = (e) => {
    e.preventDefault()
    console.log(formData)
  }
  const dataInput = [

    {htmlFor:"email",title:"Email *",type:"email",id:"email",name:"email",value:formData.email, onChange:handleChange,error:errors.email,onBlur:handleBlur},
    {htmlFor:"name",title:"Nom *",type:"text",id:"name",name:"name",value:formData.name,disabled:true, onChange:handleChange,error:errors.name,onBlur:handleBlur},
    {htmlFor:"firstName",title:"Prénom *",type:"text",id:"firstName",name:"firstName",disabled:true,value:formData.firstName, onChange:handleChange,error:errors.firstName,onBlur:handleBlur},
    {htmlFor:"pseudo",title:"Pseudo *",type:"text",id:"pseudo",name:"pseudo",value:formData.pseudo, onChange:handleChange,error:errors.pseudo,onBlur:handleBlur},
   
   
  ]

  const dataBudget = [
    {htmlFor:"budget1",title:"20€ - 40€",type:"radio",id:"budget1",name:"budget",value:"20-40", placeholder:"20€ - 40€", onChange:handleChange},
    {htmlFor:"budget2",title:"40€ - 60€",type:"radio",id:"budget2",name:"budget",value:"40-60", placeholder:"40€ - 60€", onChange:handleChange},
    {htmlFor:"budget3",title:"60€ - 80€",type:"radio",id:"budget3",name:"budget",value:"60-80", placeholder:"60€ - 80€", onChange:handleChange},
    {htmlFor:"budget4",title:"80€ - 100€",type:"radio",id:"budget4",name:"budget",value:"80-100", placeholder:"80€ - 100€", onChange:handleChange},
  ]
  return (
    <form className="profil-form" action="">

    <div className="form-data">
    
      <div className='cont-img-input'>
        <input
          type="file"
          id="file"
          name="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleChange}
        
        />
        
    
        {formData.file && (
          <div className='img-del'> 
        
              <img
              src={formData.file}
              alt="Uploaded"
              style={{ maxWidth: "100px", maxHeight: "100px" }}
              onClick={() => document.getElementById('file').click()}
            />  
           
            
          </div>
      
        )}  
      </div>
    
      <div className="from-info">
    
        
        {dataInput.map(({htmlFor,title,type,id,name,value,onChange,error,onBlur},index) => {
        console.log("name",name)
        console.log(['name','firstname'].includes(name))
        return <InputLabel htmlFor={htmlFor} key={index} title={title} input={
          <InputPrimary infoInput={name=="password" ? rulesMessage[name]:null} type={type} id={id} onChange={onChange} value={value} name={name} messageError={error} onBlur={onBlur} disabled={['name','firstName'].includes(name)} />
        }/> 
      })}
    </div>
    
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
      
      <BtnPrimary title={'Modifier'} type={'submit'} onClick={handleSubmit} />
    </form>
  );
};

export default ProfilForm;

import './profilForm.scss'
import InputLabel from "../../formulaire/inputLabel/inputLabel";
import InputPrimary from "../../basic/inputPrimary/inputPrimary";
import BtnPrimary from "../../basic/btnPrimary/btnPrimary";
import Checkbox from "../../basic/checkBox/checkBox";
import { useEffect, useState } from "react";
import { updateUserById, userAuth, getUserById } from '../../../service/api/user/userApi';
import { constFormulaire, messageErrors, messageErrorsReturnApi } from '../../../config/config';
import utilsFunction from '../../../utils/utilsFunction';
import BtnSecondary from '../../basic/btnSecondary/btnSecondary';
import { useNavigate } from 'react-router-dom';

/**
 * @function ProfilForm
 * @description Form to edit user profile
 * @returns {JSX.Element}  {JSX.Element} A form to edit user profile
 * @example
 * <ProfilForm />
 */
const ProfilForm = ({userId,isAdmin}) => {

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    firstName: '',
    pseudo: '',
    file: null,
    budget: '80-100',
  });

  const [errors, setError] = useState({
    email: '',
    name: '',
    firstName: '',
    pseudo: '',
    file: '',
    budget: '',
  }
  )
  const [globalMessage, setGlobalMessage] = useState('')


  const navigate = useNavigate()

  useEffect(() => {

    getUserById(userId).then(resp => {

      if (resp.data.data) {
        const base64img = resp.data.data.file
        let file = null;
        if (base64img){
           file = utilsFunction.dataURLtoFile(base64img,"temp.jpg")
        }
       
        setFormData({ ...formData, ...resp.data.data, file:file })

      }


    }).catch(error => {
      console.log(error)
    })
    
  }, [])

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file" && files[0]) {
      const file = files[0];

      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    } else {
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
  };
  const handleBlur = (e) => {
    const { name, value, files } = e.target;
    let msgError = '';
    console.log(!constFormulaire.regexEmail.test(value))
    if (name == "email" && !constFormulaire.regexEmail.test(value) && value) {
      msgError = messageErrors.regexEmail
    }

    setError({
      ...errors,
      [name]: msgError,
    });

  };

  const handleSubmit = (e) => {
    e.preventDefault()

    const errorstemp = {
      email: '',
      name: '',
      firstName: '',
      pseudo: '',
      file: '',
      budget: '',
    };
    let haveError = false;
    if (!constFormulaire.regexEmail.test(formData.email) && formData.email) {
      haveError = true
      errorstemp['email'] = messageErrors.regexEmail

    }

    Object.keys(errors).map((key) => {
      if (!['token', 'file'].includes(key) & !isNaN(formData[key])) {
        haveError = true
        errorstemp[key] = "Champs obligatoire.";
      }
    })
    console.log(errorstemp)
    if (haveError) {
      setError(errorstemp)
      return false
    }

    updateUserById(formData,userId).then(response => {
      console.log(response.data)
      if (isAdmin) {
        navigate('/dashboard')
      }
      setGlobalMessage('Modification prise en compte')
    }).catch(error => {
      console.log(error)
      const {message,data} = error.response.data
      console.log(message,data)
      if (message == "Invalid data for update user"){
        const errorsApi = data.errors
        const errorsTemp = {...errors}
        errorsApi.forEach(error => {
          if(Object.keys(messageErrorsReturnApi).includes(error)){
            const {target,message} =messageErrorsReturnApi[error]
            errorsTemp[target] = message
          }

        })
        setError(errorsTemp)
      } else if (data?.requiredMissing) {

        setGlobalMessage("Il manque des données.")

      }else{
        setGlobalMessage("Une erreur c'est produite")
      }
    })


  }
  let disabled =  isAdmin ? false : true
  const dataInput = [

    { htmlFor: "email", title: "Email *", type: "email", id: "email", name: "email", value: formData.email, onChange: handleChange, error: errors.email, onBlur: handleBlur },
    { htmlFor: "name", title: "Nom *", type: "text", id: "name", name: "name", value: formData.name, disabled:disabled, onChange: handleChange, error: errors.name, onBlur: handleBlur },
    { htmlFor: "firstName", title: "Prénom *", type: "text", id: "firstName", name: "firstName", disabled:disabled, value: formData.firstName, onChange: handleChange, error: errors.firstName, onBlur: handleBlur },
    { htmlFor: "pseudo", title: "Pseudo *", type: "text", id: "pseudo", name: "pseudo", value: formData.pseudo, onChange: handleChange, error: errors.pseudo, onBlur: handleBlur },


  ]

  const dataBudget = [
    { htmlFor: "budget1", title: "20€ - 40€", type: "radio", id: "budget1", name: "budget", value: "20-40", placeholder: "20€ - 40€", onChange: handleChange },
    { htmlFor: "budget2", title: "40€ - 60€", type: "radio", id: "budget2", name: "budget", value: "40-60", placeholder: "40€ - 60€", onChange: handleChange },
    { htmlFor: "budget3", title: "60€ - 80€", type: "radio", id: "budget3", name: "budget", value: "60-80", placeholder: "60€ - 80€", onChange: handleChange },
    { htmlFor: "budget4", title: "80€ - 100€", type: "radio", id: "budget4", name: "budget", value: "80-100", placeholder: "80€ - 100€", onChange: handleChange },
  ]


  return (
    <form className="profil-form" action="">

      <div className="form-data">

        <div className='cont-img-input'  >
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
                src={URL.createObjectURL(formData.file)}
                alt="Uploaded"
                onClick={() => document.getElementById('file').click()}
              />  


            </div>

          )}

          {!formData.file && (
            <div className='img-del' >

              <BtnSecondary title={"Ajouter un avatar"} onClick={(e) => {e.preventDefault()
                document.getElementById('file').click()}} />


            </div>

          )}
        </div>

        <div className="from-info">


          {dataInput.map(({ htmlFor, title, type, id, name, value, onChange, error, onBlur,disabled}, index) => {

            return <InputLabel htmlFor={htmlFor} key={index} title={title} input={
              <InputPrimary type={type} id={id} onChange={onChange} value={value} name={name} messageError={error} onBlur={onBlur} disabled={disabled} />
            } />
          })}
          <div className="budget-form" >
            <InputLabel title={"Budget"} input={

              <div className='budget-choise'>
                {dataBudget.map(({ htmlFor, title, type, id, name, value, onChange, placeholder }, index) => {
                  return <label key={index} htmlFor={htmlFor}>

                    <Checkbox isCheck={formData.budget == value} onClick={() => document.getElementById(id).click()} />
                    <input
                      type={type}
                      id={id}
                      name={name}
                      value={value}
                      onChange={onChange}
                      placeholder={id == "budget" ? placeholder : title}
                      style={{ display: "none" }}
                    />
                    <span key={index} htmlFor={htmlFor}>{title} </span>
                  </label>
                })}
              </div>
            } />
          </div>
        </div>


      </div>
      {globalMessage && <p>{globalMessage}</p>}
      <BtnPrimary labelText={"Modifier les informations du profil"} title={'Modifier'} type={'submit'} onClick={handleSubmit} />
    </form>
  );
};

export default ProfilForm;

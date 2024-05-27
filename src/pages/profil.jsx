
import {  useEffect, useState } from "react";

import '../styles/profilPage.scss'
import {IsAuth} from "../components/auth/isAuth"



import ProfilForm from "../components/formulaire/profilForm/profilForm";
import PasswordChangeForm from "../components/formulaire/passwordChangeForm/passwordChangeForm";
import Modal from "../components/modal/modal";
import BtnPrimary from "../components/basic/btnPrimary/btnPrimary";
import { userAuth } from "../service/api/user/userApi";
import { introductionProfil } from "../config/config";
import Profil from "../components/profil/profilInfo";
const  ProfilPage = ()  => {
  IsAuth()

  const [activeForm , setActiveForm] = useState('profil-form')
  const [userIdAuth,setUserIdAuth] = useState(undefined)

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    firstName: '',
    pseudo: '',
    file: null,
    budget:'',
  });


  
  useEffect(() => {

    userAuth().then( resp => {

      if(resp.data.data){
        
        setUserIdAuth(resp.data.data.id)
        console.log(resp.data.data.id)
      }

      
      
   
    }).catch(error =>{
      console.log(error)
      setGlobalError("Un erreur c'est produite")
    })
  },[])
  
  return (
  <div className="profil-page">
      {userIdAuth && <Profil userId={userIdAuth}/>}
      {/* <Modal btnUse={<BtnPrimary title={'Modifier mes informations'} />} children={
      <div className="form-content">

        {activeForm=="profil-form" &&  <span className="nav-in-page" onClick={() => {setActiveForm('password-form')}}>Changer de mot de passe</span>}
        {activeForm=="password-form" &&  <span className="nav-in-page" onClick={() => {setActiveForm('profil-form')}}>Information de base</span>}
          
        {activeForm=="profil-form" && <ProfilForm  />}
        {activeForm=="password-form" && <PasswordChangeForm  />}
        </div>} /> */}
  </div>
  );
}

export default ProfilPage;

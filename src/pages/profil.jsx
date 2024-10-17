
import {  useEffect, useState } from "react";

import '../styles/profilPage.scss'
import {IsAuth} from "../components/auth/isAuth"



import ProfilForm from "../components/formulaire/profilForm/profilForm";
import PasswordChangeForm from "../components/formulaire/passwordChangeForm/passwordChangeForm";
import Modal from "../components/modal/modal";
import BtnPrimary from "../components/basic/btnPrimary/btnPrimary";
import { userAuth } from "../service/api/user/userApi";
import Profil from "../components/profil/profilInfo";


/**
 * @function ProfilPage
 * @description Page to manage user profile
 * @returns {JSX.Element} A div containing the profile information and a modal to edit user profile
 * @example
 * <ProfilPage />
 */
const  ProfilPage = ()  => {
  IsAuth()

  const [activeForm , setActiveForm] = useState('profil-form')
  const [userIdAuth,setUserIdAuth] = useState(undefined)
  
  useEffect(() => {

    userAuth().then( resp => {

      if(resp.data.data){
        
        setUserIdAuth(resp.data.data.id)
      }

      
      
   
    }).catch(error =>{
      console.log(error)

    })
  },[])
  
  return (
  <div className="profil-page">
      {userIdAuth && <Profil userId={userIdAuth}/>}
      <Modal btnUse={<BtnPrimary title={'Modifier mes informations'} />}>
        <div className="form-content">

          {activeForm=="profil-form" &&  <span className="nav-in-page" onClick={() => {setActiveForm('password-form')}}>Changer de mot de passe</span>}
          {activeForm=="password-form" &&  <span className="nav-in-page" onClick={() => {setActiveForm('profil-form')}}>Information de base</span>}
            
          {activeForm=="profil-form" && <ProfilForm userId={userIdAuth} />}
          {activeForm=="password-form" && <PasswordChangeForm  />}
        </div>
      </Modal>
  </div>
  );
}

export default ProfilPage;

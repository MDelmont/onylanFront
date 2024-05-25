
import {  useState } from "react";

import '../styles/profilPage.scss'
import {IsAuth} from "../components/auth/isAuth"



import ProfilForm from "../components/formulaire/profilForm/profilForm";
import PasswordChangeForm from "../components/formulaire/passwordChangeForm/passwordChangeForm";
import Modal from "../components/modal/modal";
import BtnPrimary from "../components/basic/btnPrimary/btnPrimary";
const  ProfilPage = ()  => {
  IsAuth()

  const [activeForm , setActiveForm] = useState('profil-form')
  
  return (
    <div className="profil-page">
        <h1>
          Profil
        </h1>
        <Modal btnUse={<BtnPrimary title={'Modifier'} />} children={
          <div>

        {activeForm=="profil-form" &&  <span className="nav-in-page" onClick={() => {setActiveForm('password-form')}}>Changer de mot de passe</span>}
        {activeForm=="password-form" &&  <span className="nav-in-page" onClick={() => {setActiveForm('profil-form')}}>Information de base</span>}
          
        {activeForm=="profil-form" && <ProfilForm  />}
        {activeForm=="password-form" && <PasswordChangeForm  />}
          </div>} />
        
        
      </div>
  );
}

export default ProfilPage;

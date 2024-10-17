
import {  useEffect, useState } from "react";

import '../../styles/UpdatePlayerPage.scss'
import {IsAdmin} from "../../components/auth/isAdmin"
import { getUserById } from "../../service/api/user/userApi";
import UserCard from "../../components/userCard/userCard";
import ProfilForm from "../../components/formulaire/profilForm/profilForm";
import { useParams } from "react-router-dom";

/**
 * page for displaying the list of players
 * 
 * @returns {JSX.Element} Component for displaying the list of players
 */
const  UpdatePlayerPage = ()  => {
  IsAdmin()

  const {userId} = useParams()
  
  return (
  <div className="update-player-page">
    <h1>Mise à jours de l'utilisateur</h1>
    <ProfilForm userId={userId} isAdmin={true} />
    
  </div>
  );
}

export default UpdatePlayerPage;

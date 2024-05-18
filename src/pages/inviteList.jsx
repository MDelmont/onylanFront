import React, { useEffect, useState } from "react";
import "../styles/inviteListPage.scss";;
import { IsAdmin } from "../components/auth/isAdmin";
import { useNavigate } from "react-router-dom";
import {appConfig} from "../config/config"
import { useDispatch  } from 'react-redux';
import { getAllInvitations,deleteInvitation } from '../store/userSlice'; 
const InviteListPage = () => {
  IsAdmin()
  const [invitations, setInviations] = useState(null)
  const navigate = useNavigate();
  const dispatch =useDispatch()

  useEffect (() => {
    console.log('Start get invitation')
    dispatch(getAllInvitations())
      .unwrap()
      .then(response => {

        console.log(response.data.invitation)
        setInviations(response.data.invitation)
      })
      .catch(error => {
        console.log(error)
      })
  },[])

  const handleRemoveInvit = (e) => {
    const id = e.currentTarget.id
    dispatch(deleteInvitation(id))
      .unwrap()
      .then(response => {


        dispatch(getAllInvitations())
        .unwrap()
        .then(response => {

          console.log(response.data.invitation)
          setInviations(response.data.invitation)
        })
      .catch(error => {
        console.log(error)
      })
      })
      .catch(error => {
        console.log(error)
      })
  }
  const handleOpenNewInvitation = (e) => {
    navigate('/invite/new')
  }
  return (
    <div className="invite-list-page">
     

    <h1>list d'invitation</h1>
 
    <table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prénom</th>
          <th>URL</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {invitations && invitations.map((invitation) => (
          <tr key={invitation.id}>
            <td>{invitation.user.name}</td>
            <td>{invitation.user.firstName}</td>
            <td>
              <a href={`${appConfig.urlFront}/register/${invitation.token}`}>{appConfig.urlFront}/register/{invitation.token}</a>
            </td>
            <td>
              <button onClick={handleRemoveInvit} id={invitation.id}>Annuler l'invitation</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
        <button onClick={handleOpenNewInvitation}>Nouvelle invitation</button>
    </div>
  );
};

export default InviteListPage;